import { Component, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { ParamsFacadeService } from '../../../../../../stores/params';
import { NumControl } from '../../controls/number/number-control';
import { SelectControl } from '../../controls/select/select-control';
import { StringControl } from '../../controls/string/string-control';
import { numSocket } from '../../sockets';

export class ParamEmitterComponent extends Component {
  constructor(private readonly _paramsFacadeService: ParamsFacadeService) {
    super('Emitter: Param');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const out1 = new Output('out', 'out', numSocket);

    const nodes = this._paramsFacadeService.nodes;

    node.addControl(new SelectControl(editor, 'nodeId', nodes));
    node.addControl(new StringControl(editor, 'paramId', 'Param id'));
    node.addControl(new NumControl(editor, 'out')).addOutput(out1);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs['out'] = node.data.out;
  }
}
