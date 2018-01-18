// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-es6/System.Linq/Linq';
import { ILinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Enumerable';
import { Node } from './Node';

export class NamedNode<TNode extends NamedNode<TNode, TValue>, TValue> extends Node<TNode, TValue> {

  protected constructor(node?:TValue) {
    if (node !== undefined) {
      super(node);
    }
  }

  private name:string;
  public get Name():string {
    return this.name;
  }
  protected set(name:string) {
    this.name = name;
  }

  // #region Traversal

  public Child(name:string):TNode {
    return super.Children().where(node => node.Name === name).first();
  }

  public Ancestors(nameOrInclusiveDepth?:string | number, inclusiveDepth?:number):ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth !== 'string') {
      return super.Ancestors(nameOrInclusiveDepth);
    }
    return super.Ancestors(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public AncestorsAndSelf(nameOrInclusiveDepth?:string | number, inclusiveDepth?:number):ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth !== 'string') {
      return super.AncestorsAndSelf(nameOrInclusiveDepth);
    }
    return super.AncestorsAndSelf(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public Children(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.Children() 
    : super.Children().where(node => node.Name === name);
  }

  public NextsFromSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromSelf()
    : super.NextsFromSelf().where(node => node.Name === name);
  }

  public NextsFromSelfAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromSelfAndSelf()
    : super. NextsFromSelfAndSelf().where(node => node.Name === name);
  }

  public NextsFromLast(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromLast()
    : super.NextsFromLast().where(node => node.Name === name);
  }

  public NextsFromLastAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromLastAndSelf()
    : super.NextsFromLastAndSelf().where(node => node.Name === name);
  }

  public PrevsFromFirst(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromFirst()
    : super.PrevsFromFirst().where(node => node.Name === name);
  }

  public PrevsFromFirstAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromFirstAndSelf()
    : super.PrevsFromFirstAndSelf().where(node => node.Name === name);
  }

  public PrevsFromSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromSelf()
    : super.PrevsFromSelf().where(node => node.Name === name);
  }

  public PrevsFromSelfAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromSelfAndSelf()
    : super.PrevsFromSelfAndSelf().where(node => node.Name === name);
  }

  public Descendants(nameOrInclusiveDepth?:string | number, inclusiveDepth?:number):ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth !== 'string') {
      return super.Descendants(nameOrInclusiveDepth);
    }
    return super.Descendants(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public DescendantsAndSelf(nameOrInclusiveDepth?:string | number, inclusiveDepth?:number):ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth !== 'string') {
      return super.DescendantsAndSelf(nameOrInclusiveDepth);
    }
    return super.DescendantsAndSelf(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public Siblings(nameOrInclusiveEachLength?:string | number, inclusiveEachLength?:number):ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveEachLength !== 'string') {
      return super.Siblings(nameOrInclusiveEachLength);
    }
    return super.Siblings(inclusiveEachLength).where(node => node.Name === nameOrInclusiveEachLength);
  }

  public SiblingsAndSelf(nameOrInclusiveEachLength?:string | number, inclusiveEachLength?:number)
    :ILinqEnumerable<TNode> {
    if (typeof nameOrInclusiveEachLength !== 'string') {
      return super.SiblingsAndSelf(nameOrInclusiveEachLength);
    }
    return super.SiblingsAndSelf(inclusiveEachLength).where(node => node.Name === nameOrInclusiveEachLength);
  }

  public AncestorsAndSiblingsAfterSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsAndSiblingsAfterSelf()
    : super.AncestorsAndSiblingsAfterSelf().where(node => node.Name === name);
  }

  public AncestorsAndSiblingsAfterSelfAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsAndSiblingsAfterSelfAndSelf()
    : super.AncestorsAndSiblingsAfterSelfAndSelf().where(node => node.Name === name);
  }

  public AncestorsAndSiblingsBeforeSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsAndSiblingsBeforeSelf()
    : super.AncestorsAndSiblingsBeforeSelf().where(node => node.Name === name);
  }

  public AncestorsAndSiblingsBeforeSelfAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsAndSiblingsBeforeSelfAndSelf()
    : super.AncestorsAndSiblingsBeforeSelfAndSelf().where(node => node.Name === name);
  }
  
  public AncestorsWithSingleChild(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsWithSingleChild()
    : super.AncestorsWithSingleChild().where(node => node.Name === name);
  }

  public AncestorsWithSingleChildAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.AncestorsWithSingleChildAndSelf()
    : super.AncestorsWithSingleChildAndSelf().where(node => node.Name === name);
  }

  public DescendantsOfSingle(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.DescendantsOfSingle()
    : super.DescendantsOfSingle().where(node => node.Name === name);
  }

  public DescendantsOfSingleAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.DescendantsOfSingleAndSelf()
    : super.DescendantsOfSingleAndSelf().where(node => node.Name === name);
  }

  public DescendantsOfFirstChild(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.DescendantsOfFirstChild()
    : super.DescendantsOfFirstChild().where(node => node.Name === name);
  }

  public DescendantsOfFirstChildAndSelf(name?:string):ILinqEnumerable<TNode> {
    return name === undefined 
    ? super.DescendantsOfFirstChildAndSelf()
    : super.DescendantsOfFirstChildAndSelf().where(node => node.Name === name);
  }
}
