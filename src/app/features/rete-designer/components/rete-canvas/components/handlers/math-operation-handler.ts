import { Expression, Parser } from 'expr-eval';
import { Component, Input, Node, NodeEditor, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { NumControl } from '../../controls/number/number-control';
import { StringControl } from '../../controls/string/string-control';
import { numSocket } from '../../sockets';

export class MathOperationHandler extends Component {
  constructor() {
    super('Handler: Math');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const inp1 = new Input('in1', 'in1', numSocket);
    const inp2 = new Input('in2', 'in2', numSocket);
    const out = new Output('out', 'out', numSocket);

    node.addControl(new StringControl(editor, 'expression', '(in1 + in2) / 2'));

    inp1.addControl(new NumControl(editor, 'in1'));
    inp2.addControl(new NumControl(editor, 'in2'));

    node
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new NumControl(editor, 'preview', true))
      .addOutput(out);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const in1 = Number(inputs['in1']?.length ? inputs['in1'][0] : node.data.in1);
    const in2 = Number(inputs['in2']?.length ? inputs['in2'][0] : node.data.in2);
    const expression = String(
      inputs['expression']?.length ? inputs['expression'][0] : node.data.expression,
    );

    let result = 0;
    if (expression) {
      const parser = new Parser();
      const expr: Expression = parser.parse(expression);
      result = expr.evaluate({ in1, in2 });
    }

    const ctrl = this.editor?.nodes
      ?.find(n => n.id === node.id)
      ?.controls.get('preview') as NumControl;
    ctrl.setValue(result);
    outputs['out'] = result;
  }
}
