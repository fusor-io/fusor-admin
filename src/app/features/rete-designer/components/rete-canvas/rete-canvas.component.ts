import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Engine, Input, NodeEditor, Output } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import AreaPlugin from 'rete-area-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import { AddComponent } from './components/add-component';
import { NumComponent } from './components/number-component';

@Component({
  selector: 'fa-rete-canvas',
  templateUrl: './rete-canvas.component.html',
  styleUrls: ['./rete-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReteCanvasComponent implements AfterViewInit {
  @ViewChild('nodeEditor', { static: true }) private _rete!: ElementRef;
  editor!: NodeEditor;

  constructor() {}

  async ngAfterViewInit(): Promise<void> {
    const container = this._rete.nativeElement;

    const components = [new NumComponent(), new AddComponent()];

    const editor = new NodeEditor('demo@0.2.0', container);
    editor.use(ConnectionPlugin);
    console.log('AngularRenderPlugin', AngularRenderPlugin);
    editor.use(AngularRenderPlugin);
    editor.use(ContextMenuPlugin);

    const engine = new Engine('demo@0.2.0');

    components.map((component) => {
      editor.register(component);
      engine.register(component);
    });

    const n1 = await components[0].createNode({ num: 2 });
    const n2 = await components[0].createNode({ num: 0 });
    const add = await components[1].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(
      <Output>n1.outputs.get('num'),
      <Input>add.inputs.get('num1')
    );
    editor.connect(
      <Output>n2.outputs.get('num'),
      <Input>add.inputs.get('num2')
    );

    editor.on(
      [
        'process',
        'nodecreated',
        'noderemoved',
        'connectioncreated',
        'connectionremoved',
      ],
      (async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }) as any
    );

    editor.view.resize();
    editor.trigger('process');
    AreaPlugin.zoomAt(editor);

    this.editor = editor;
  }
}
