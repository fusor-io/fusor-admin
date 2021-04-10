import { Component, Node, NodeEditor, Output } from 'rete';

import { NumControl } from '../controls/number/number-control';
import { numSocket } from '../sockets';
import { StringControl } from './../controls/string/string-control';

export class NumComponent extends Component {
  constructor() {
    super('Number');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const out1 = new Output('num', 'Number', numSocket);

    node.addControl(new StringControl(editor, 'node', 'Node id'));
    node.addControl(new StringControl(editor, 'param', 'Param id'));
    node.addControl(new NumControl(editor, 'num')).addOutput(out1);
  }

  worker(node: any, inputs: any, outputs: any) {
    outputs['num'] = node.data.num;
  }
}
