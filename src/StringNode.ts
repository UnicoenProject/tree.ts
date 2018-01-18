import { NamedNode } from './NamedNode';
export class StringNode extends NamedNode<StringNode, string> {

  public get Value():string {
    return super.getValue();
  }
  public set Value(value:string) {
    super.setValue(value);
  }
  
  public constructor(node: string) {
    super(node);
  }

  public AddFirst(value:string | StringNode):StringNode {
    if (typeof value === 'string') {
      return super.AddFirst(new StringNode(value));
    }
    return super.AddFirst(value);
  }

  public AddLast(value:string | StringNode):StringNode {
    if (typeof value === 'string') {
      return super.AddLast(new StringNode(value));
    }
    return super.AddLast(value);
  }

  public AddNext(value:string | StringNode):StringNode {
    if (typeof value === 'string') {
      return super.AddNext(new StringNode(value));
    }
    return super.AddNext(value);
  }

  public AddPrevious(value:string | StringNode):StringNode {
    if (typeof value === 'string') {
      return super.AddPrevious(new StringNode(value));
    }
    return super.AddPrevious(value);
  }
}
