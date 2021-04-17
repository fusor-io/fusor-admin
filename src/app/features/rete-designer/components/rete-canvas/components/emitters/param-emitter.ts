import { Component, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { combineLatest } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { filterDefined } from 'src/app/utils/operators';

import { ParamsFacadeService } from '../../../../../../stores/params';
import { SelectControl } from '../../controls';
import { NumControl } from '../../controls/number/number-control';
import { numSocket } from '../../sockets';

export class ParamEmitterComponent extends Component {
  constructor(private readonly _paramsFacadeService: ParamsFacadeService) {
    super('Emitter: Param');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const out1 = new Output('out', 'out', numSocket);

    const nodeSelector = new SelectControl(editor, 'nodeId', this._paramsFacadeService.nodeList$);
    const params$ = nodeSelector.selectedValue$.pipe(
      filterDefined(),
      map(value => this._paramsFacadeService.params(value)),
    );

    const paramSelector = new SelectControl(editor, 'paramId', params$);
    const valueInput = new NumControl(editor, 'out');

    node.addControl(nodeSelector);
    node.addControl(paramSelector);
    node.addControl(valueInput).addOutput(out1);

    // TODO find a way to unsubscribe
    combineLatest([
      nodeSelector.selectedValue$.pipe(filterDefined()),
      paramSelector.selectedValue$.pipe(filterDefined()),
      this._paramsFacadeService.params$, // trigger update when params changes
    ])
      .pipe(
        map(([nodeId, paramId]) => this._paramsFacadeService.value(nodeId, paramId)),
        delay(20),
      )
      .subscribe(value => valueInput.onChange(value));
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs['out'] = node.data.out;
  }
}
