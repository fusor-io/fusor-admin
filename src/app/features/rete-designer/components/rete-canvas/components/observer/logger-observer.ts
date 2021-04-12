import { Component, Input, Node, NodeEditor } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls/number/number-control';
import { numSocket } from '../../sockets';

export class LoggerObserver extends Component {
  constructor() {
    super('Observer: Logger');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);

    input.addControl(new NumControl(editor, 'in'));

    node.addInput(input).addControl(new NumControl(editor, 'preview', true));
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);

    if (!isNaN(input)) console.log(`Logger: ${input}`);

    const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
    ctrl.setValue(input);
  }
}
