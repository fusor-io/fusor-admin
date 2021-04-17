import { Component, Input, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls';
import { numSocket } from '../../sockets';

export class DistinctHandler extends Component {
  private _lastInput = NaN;

  constructor() {
    super('Handler: Distinct');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);
    const out = new Output('out', 'out', numSocket);

    input.addControl(new NumControl(editor, 'in'));

    node.addInput(input).addControl(new NumControl(editor, 'preview', true)).addOutput(out);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);
    if (input !== this._lastInput) {
      this._lastInput = input;
      const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
      ctrl.setValue(input);
      outputs['out'] = input;
    }
  }
}
