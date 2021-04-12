import { Component, Input, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls/number/number-control';
import { numSocket } from '../../sockets';

export class GateHandler extends Component {
  constructor() {
    super('Handler: Gate');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);
    const gate = new Input('gate', 'gate', numSocket);
    const out = new Output('out', 'out', numSocket);

    input.addControl(new NumControl(editor, 'in'));
    gate.addControl(new NumControl(editor, 'gate'));

    node.addInput(input).addInput(gate).addControl(new NumControl(editor, 'preview', true)).addOutput(out);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);
    const gate = Number(inputs['gate']?.length ? inputs['gate'][0] : node.data.gate);

    const output = gate ? input : NaN;

    const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
    ctrl.setValue(output);
    outputs['out'] = output;
  }
}
