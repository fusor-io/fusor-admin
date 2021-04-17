import { Component, Input, Node, NodeEditor } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl, StringControl } from '../../controls';
import { numSocket } from '../../sockets';

export class LoggerObserver extends Component {
  constructor() {
    super('Observer: Logger');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);
    node.addControl(new StringControl(editor, 'label', 'Logger name'));

    input.addControl(new NumControl(editor, 'in'));

    node.addInput(input).addControl(new NumControl(editor, 'preview', true));
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);
    const label = String(
      node.data.label,
    );

    if (!isNaN(input)) console.log(`Logger: [${label}] = ${input}`);

    const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
    ctrl.setValue(input);
  }
}
