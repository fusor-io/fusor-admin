import { Component, Input, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls';
import { numSocket } from '../../sockets';

export class ThrottleHandler extends Component {
  private _lastInputTime = 0;

  constructor() {
    super('Handler: Throttle');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);
    const out = new Output('out', 'out', numSocket);
    input.addControl(new NumControl(editor, 'in'));
    node.addControl(new NumControl(editor, 'duration', 'milliseconds'));
    node.addInput(input).addControl(new NumControl(editor, 'preview', '', true)).addOutput(out);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);
    const duration = Number(node.data.duration || 0);
    const now = Date.now();

    if (now - this._lastInputTime > duration && !isNaN(input)) {
      this._lastInputTime = now;
      const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
      ctrl.setValue(input);
      outputs['out'] = input;
    }
  }
}
