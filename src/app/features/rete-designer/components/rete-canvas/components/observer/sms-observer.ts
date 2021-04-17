import { HttpClient } from '@angular/common/http';
import pupa from 'pupa';
import { Component, Input, Node, NodeEditor } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

import { environment } from '../../../../../../../environments/environment';
import { NumControl, StringControl } from '../../controls';
import { numSocket } from '../../sockets';

export class SmsObserver extends Component {
  constructor(private readonly _httpClient: HttpClient) {
    super('Observer: SMS');
  }

  async builder(node: Node): Promise<void> {
    const editor = <NodeEditor>this.editor;

    const input = new Input('in', 'in', numSocket);
    node.addControl(new StringControl(editor, 'recipient', '+3701122233'));
    node.addControl(new StringControl(editor, 'text', 'Value is {in}'));

    input.addControl(new NumControl(editor, 'in'));

    node.addInput(input).addControl(new NumControl(editor, 'preview', true));
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = Number(inputs['in']?.length ? inputs['in'][0] : node.data.input);
    const recipient = String(node.data.recipient);
    const template = String(node.data.text);

    if (!isNaN(input) && recipient) {
      const message = template ? pupa(template, { in: input }) : String(input);
      this.sendMessage(recipient, message);
    }

    const ctrl = this.editor?.nodes?.find(n => n.id === node.id)?.controls.get('preview') as NumControl;
    ctrl.setValue(input);
  }

  async sendMessage(recipient: string, text: string): Promise<void> {
    console.log(`Sending SMS message "${text} to ${recipient}`);
    try {
      const result: any = await this._httpClient
        .post(`${environment.apiUrl}/sms`, {
          recipient,
          text,
        })
        .toPromise();

      if (!result.status === true) {
        console.error('sms delivery error');
      }
    } catch (error) {
      console.error('sms delivery error', { error });
    }
  }
}
