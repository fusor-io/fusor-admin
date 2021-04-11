import { Component, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls/number/number-control';
import { StringControl } from '../../controls/string/string-control';
import { numSocket } from '../../sockets';

export class ParamEmitterComponent extends Component {
  constructor() {
    super('Emitter: Param');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const out1 = new Output('out', 'out', numSocket);

    node.addControl(new StringControl(editor, 'nodeId', 'Node id'));
    node.addControl(new StringControl(editor, 'paramId', 'Param id'));
    node.addControl(new NumControl(editor, 'out')).addOutput(out1);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs['out'] = node.data.out;
  }
}
