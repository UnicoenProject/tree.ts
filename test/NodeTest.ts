// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-es6/System.Linq/Linq';
import { areEqual } from 'typescript-dotnet-es6/System/Collections/Array/Compare';
import { assert } from 'chai';
import { StringNode } from '../src/index';

// npm run test

describe('OperateRoot', () => {
  const root = new StringNode('a');
  it(`HaveCount(0)`, () => {
    assert.equal(root.PrevsFromFirst().count(),0);
    assert.equal(root.NextsFromSelf().count(),0);
    assert.equal(root.PrevsFromSelf().count(),0);
    assert.equal(root.NextsFromLast().count(),0);
  });
  it(`IFiniteEnumerable.Repeat(root, 1)`, () => {
    assert.isTrue(areEqual(root.PrevsFromFirstAndSelf().toArray(), Enumerable.repeat(root, 1).toArray()));
    assert.isTrue(areEqual(root.NextsFromSelfAndSelf().toArray(), Enumerable.repeat(root, 1).toArray()));
    assert.isTrue(areEqual(root.PrevsFromSelfAndSelf().toArray(), Enumerable.repeat(root, 1).toArray()));
    assert.isTrue(areEqual(root.NextsFromLastAndSelf().toArray(), Enumerable.repeat(root, 1).toArray()));
  });
});

describe('Create1Node', () => {
  const node = new StringNode('a');
  it(String.raw`node.toString() == 'a\n'`, () => {
    assert.equal(node.toString(), 'a\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == ''`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), '');
  });
});

describe('Create2Node', () => {
  const node = new StringNode('a');
  node.AddFirst(new StringNode('b'));
  it(String.raw`node.toString() == 'a\\n  b\\n'`, () => {
    assert.equal(node.toString(), 'a\n  b\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'b'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'b');
  });
});

describe('Create3Node', () => {
  const node = new StringNode('a');
  node.AddLast(new StringNode('b'));
  node.AddFirst(new StringNode('c'));
  it(String.raw`node.toString() == 'a\n  c\n  b\n'`, () => {
    assert.equal(node.toString(), 'a\n  c\n  b\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'cb'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'cb');
  });
});

describe('Create4Node', () => {
  const node = new StringNode('a');
  node.AddLast(new StringNode('b'));
  node.AddFirst(new StringNode('c'));
  node.AddLast(new StringNode('d'));
  it(String.raw`node.toString() == 'a\n  c\n  b\n  d\n'`, () => {
    assert.equal(node.toString(), 'a\n  c\n  b\n  d\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'cbd'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'cbd');
  });
});

describe('CreateTreeAndTraverse', () => {
  // a - e 
  //     d        
  //     b - g - k
  //             h
  //             j
  //       - f - l
  //             i
  //             m
  //     c      
  const a = new StringNode('a'); // 1
  const b = a.AddFirst(new StringNode('b')); // 2
  const c = a.AddLast(new StringNode('c')); // 2
  const d = a.AddFirst(new StringNode('d')); // 2
  const e = a.AddFirst(new StringNode('e')); // 2
  const f = b.AddFirst(new StringNode('f')); // 3
  const g = b.AddFirst(new StringNode('g')); // 3
  const h = g.AddLast('h'); // 4
  const i = f.AddLast('i'); // 4
  const j = h.AddNext('j'); // 4
  const k = h.AddPrevious('k'); // 4
  const l = i.AddPrevious('l'); // 4
  const m = i.AddNext('m'); // 4

  it(`a.toString()`, () => {
    assert.equal(a.toString(), 
                 'a\n  e\n  d\n  b\n    g\n      k\n      h\n      j\n    f\n      l\n      i\n      m\n  c\n'
                 .normalizeNewLine());
  });
  it(`LengthFromDeepestChild`, () => {
    assert.equal(a.LengthFromDeepestChild, 3);
    assert.equal(b.LengthFromDeepestChild, 2);
    assert.equal(c.LengthFromDeepestChild, 0);
    assert.equal(d.LengthFromDeepestChild, 0);
    assert.equal(e.LengthFromDeepestChild, 0);
    assert.equal(f.LengthFromDeepestChild, 1);
    assert.equal(g.LengthFromDeepestChild, 1);
    assert.equal(h.LengthFromDeepestChild, 0);
    assert.equal(i.LengthFromDeepestChild, 0);
    assert.equal(j.LengthFromDeepestChild, 0);
    assert.equal(k.LengthFromDeepestChild, 0);
    assert.equal(l.LengthFromDeepestChild, 0);
    assert.equal(m.LengthFromDeepestChild, 0);
  });
  it(`.select(n => n.Value).toJoinedString('')`, () => {
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbgkhjflimc');
    assert.equal(e.Descendants().select(n => n.Value).toJoinedString(''),'');
    assert.equal(d.Descendants().select(n => n.Value).toJoinedString(''),'');
    assert.equal(b.Descendants().select(n => n.Value).toJoinedString(''),'gkhjflim');
    assert.equal(c.Descendants().select(n => n.Value).toJoinedString(''),'');

    assert.equal(a.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'aedbgkhjflimc');
    assert.equal(e.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'e');
    assert.equal(d.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'d');
    assert.equal(b.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'bgkhjflim');
    assert.equal(c.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'c');

    assert.equal(a.Descendants(2).select(n => n.Value).toJoinedString(''),'edbgfc');
    assert.equal(e.Descendants(2).select(n => n.Value).toJoinedString(''),'');
    assert.equal(d.Descendants(2).select(n => n.Value).toJoinedString(''),'');
    assert.equal(b.Descendants(2).select(n => n.Value).toJoinedString(''),'gkhjflim');
    assert.equal(c.Descendants(2).select(n => n.Value).toJoinedString(''),'');
    assert.equal(b.Descendants(0).select(n => n.Value).toJoinedString(''),'');

    assert.equal(a.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'aedbgfc');
    assert.equal(e.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'e');
    assert.equal(d.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'d');
    assert.equal(b.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'bgkhjflim');
    assert.equal(c.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'c');
    assert.equal(b.DescendantsAndSelf(0).select(n => n.Value).toJoinedString(''),'b');

    assert.equal(a.Siblings().select(n => n.Value).toJoinedString(''),'');
    assert.equal(k.Siblings().select(n => n.Value).toJoinedString(''),'hj');
    assert.equal(h.Siblings().select(n => n.Value).toJoinedString(''),'kj');
    assert.equal(j.Siblings().select(n => n.Value).toJoinedString(''),'kh');
    assert.equal(i.Siblings().select(n => n.Value).toJoinedString(''),'lm');

    assert.equal(a.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'a');
    assert.equal(k.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
    assert.equal(h.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
    assert.equal(j.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
    assert.equal(i.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'lim');

    assert.equal(a.Siblings(1).select(n => n.Value).toJoinedString(''),'');
    assert.equal(k.Siblings(1).select(n => n.Value).toJoinedString(''),'h');
    assert.equal(h.Siblings(1).select(n => n.Value).toJoinedString(''),'kj');
    assert.equal(j.Siblings(1).select(n => n.Value).toJoinedString(''),'h');
    assert.equal(i.Siblings(1).select(n => n.Value).toJoinedString(''),'lm');
    assert.equal(i.Siblings(0).select(n => n.Value).toJoinedString(''),'');

    assert.equal(a.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'a');
    assert.equal(k.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'kh');
    assert.equal(h.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'khj');
    assert.equal(j.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'hj');
    assert.equal(i.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'lim');
    assert.equal(i.SiblingsAndSelf(0).select(n => n.Value).toJoinedString(''),'i');

    assert.equal(i.Ancestors().select(n => n.Value).toJoinedString(''),'fba');
    assert.equal(i.Ancestors(3).select(n => n.Value).toJoinedString(''),'fba');
    assert.equal(i.Ancestors(2).select(n => n.Value).toJoinedString(''),'fb');
    assert.equal(i.Ancestors(1).select(n => n.Value).toJoinedString(''),'f');
    assert.equal(i.Ancestors(0).select(n => n.Value).toJoinedString(''),'');

    assert.equal(i.AncestorsAndSelf().select(n => n.Value).toJoinedString(''),'ifba');
    assert.equal(i.AncestorsAndSelf(3).select(n => n.Value).toJoinedString(''),'ifba');
    assert.equal(i.AncestorsAndSelf(2).select(n => n.Value).toJoinedString(''),'ifb');
    assert.equal(i.AncestorsAndSelf(1).select(n => n.Value).toJoinedString(''),'if');
    assert.equal(i.AncestorsAndSelf(0).select(n => n.Value).toJoinedString(''),'i');

    assert.equal(f.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'c');
    assert.equal(f.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'fc');
    assert.equal(f.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'gbdea');
    assert.equal(f.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'fgbdea');

    assert.equal(h.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'jfc');
    assert.equal(h.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'hjfc');
    assert.equal(h.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'kgbdea');
    assert.equal(h.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'hkgbdea');
  });
  it(`toArray()`, () => {
    assert.isTrue(areEqual(b.Ancestors().toArray(), [a]));
    assert.isTrue(areEqual(b.AncestorsAndSelf().toArray(), [b, a]));
    assert.isTrue(areEqual(b.Children().toArray(), [g, f]));
    assert.isTrue(areEqual(b.ReverseChildren().toArray(), b.Children().reverse().toArray()));
    assert.equal(b.ChildrenCount,2);
    assert.isTrue(areEqual(b.NextsFromSelf().toArray(), [c]));
    assert.isTrue(areEqual(b.NextsFromSelfAndSelf().toArray(), [b, c]));
    assert.isTrue(areEqual(b.NextsFromLast().toArray(), [c]));
    assert.isTrue(areEqual(b.NextsFromLastAndSelf().toArray(), [c, b]));
    assert.isTrue(areEqual(b.PrevsFromFirst().toArray(), [e, d]));
    assert.isTrue(areEqual(b.PrevsFromFirstAndSelf().toArray(), [e, d, b]));
    assert.isTrue(areEqual(b.PrevsFromSelf().toArray(), [d, e]));
    assert.isTrue(areEqual(b.PrevsFromSelfAndSelf().toArray(), [b, d, e]));
    assert.isTrue(areEqual(b.DescendantsOfFirstChild().toArray(), [g, k]));
    assert.isTrue(areEqual(b.DescendantsOfFirstChildAndSelf().toArray(), [b, g, k]));

    assert.isTrue(areEqual(e.Ancestors().toArray(), [a]));
    assert.isTrue(areEqual(e.AncestorsAndSelf().toArray(), [e, a]));
    assert.isTrue(areEqual(e.Children().toArray(), []));
    assert.isTrue(areEqual(e.ReverseChildren().toArray(), e.Children().reverse().toArray()));
    assert.equal(e.ChildrenCount, 0);
    assert.isTrue(areEqual(e.NextsFromSelf().toArray(), [d, b, c]));
    assert.isTrue(areEqual(e.NextsFromSelfAndSelf().toArray(), [e, d, b, c]));
    assert.isTrue(areEqual(e.NextsFromLast().toArray(), [c, b, d]));
    assert.isTrue(areEqual(e.NextsFromLastAndSelf().toArray(), [c, b, d, e]));
    assert.isTrue(areEqual(e.PrevsFromFirst().toArray(), []));
    assert.isTrue(areEqual(e.PrevsFromFirstAndSelf().toArray(), [e]));
    assert.isTrue(areEqual(e.PrevsFromSelf().toArray(), []));
    assert.isTrue(areEqual(e.PrevsFromSelfAndSelf().toArray(), [e]));
    assert.isTrue(areEqual(e.DescendantsOfFirstChild().toArray(), []));
    assert.isTrue(areEqual(e.DescendantsOfFirstChildAndSelf().toArray(), [e]));  
  });

  it(`restore()`, () => {
    const restoreG = g.RemoveRecoverably();
    assert.isNotNull(restoreG);
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbflimc');
    
    const restoreF = f.RemoveRecoverably();
    assert.isNotNull(restoreF);
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbc');
    
    const anotherRestoreF = f.RemoveRecoverably();
    restoreF();
    anotherRestoreF();
    restoreF();
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbflimc');

    const anotherRestoreG = g.RemoveRecoverably();
    restoreG();
    anotherRestoreG();
    restoreG();
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbgkhjflimc');
  });
  it(`foreach()`, () => {
    a.Descendants().forEach(node => {
      const restore = node.RemoveRecoverably();
      assert.isNotNull(restore);
      assert.notInclude(a.Descendants().select(n => n.Value).toJoinedString(''), node.Value);
      restore();
      assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbgkhjflimc');
    });
  });

  it(`Replaced()`, () => {
    h.Replace(new StringNode('1'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbgk1jflimc');
    
    i.Replace(new StringNode('2'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbgk1jfl2mc');
    
    j.Replace(new StringNode('3'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbgk13fl2mc');
    
    k.Replace(new StringNode('4'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbg413fl2mc');
    
    l.Replace(new StringNode('5'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbg413f52mc');
    
    m.Replace(new StringNode('6'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbg413f526c');


    f.Replace(new StringNode('7'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edbg4137c');
    
    g.Replace(new StringNode('8'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'edb87c');


    b.Replace(new StringNode('9'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'ed9c');
    
    c.Replace(new StringNode('0'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'ed90');
    
    d.Replace(new StringNode('1'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), 'e190');
    
    e.Replace(new StringNode('2'));
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''), '2190');
  })
  ;
});
describe('TraverseSingles', () => {
  const a = new StringNode('a');
  const b = new StringNode('b');
  const c = new StringNode('c');
  const d = new StringNode('d');
  const e = new StringNode('e');
  const f = new StringNode('f');
  const g = new StringNode('g');
  // a - b - c - d - e
  //   - g - f
  a.AddFirst(b);
  a.AddLast(g);
  b.AddFirst(c);
  c.AddFirst(d);
  d.AddFirst(e);
  d.AddLast(f);
  it(`.select(n => n.Value).toJoinedString('')`, () => {
    assert.equal(b.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'cd');
    assert.equal(b.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'bcd');
    assert.equal(c.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'d');
    assert.equal(c.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'cd');

    assert.equal(b.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
    assert.equal(b.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'b');
    assert.equal(c.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'b');
    assert.equal(c.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'cb');
    assert.equal(d.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'cb');
    assert.equal(d.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'dcb');
    assert.equal(e.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
    assert.equal(e.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'e');
  });
});

describe('Replace', () => {
  it(`a.DescendantsAndSelf().select(n => n.Value).toJoinedString('') == 'ad'`, () => {
    const a = new StringNode('a');
    const b = new StringNode('b');
    const c = new StringNode('c');
    // a - b - c
    a.AddFirst(b);
    b.AddFirst(c);
    b.Replace(new StringNode('d'));
    assert.equal(a.DescendantsAndSelf().select(n => n.Value).toJoinedString(''), 'ad');
  });
});

// [Test]
// public void UseExtensionMethodsForIEnumerable() {
//   new XElement[0].Descendants("test").Descendants("test");
//   new StringNode[0].Descendants("test").Descendants("test");
// }
