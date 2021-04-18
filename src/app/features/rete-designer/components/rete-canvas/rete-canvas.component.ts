import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as Rete from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import AreaPlugin from 'rete-area-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ParamsFacadeService } from '../../../../stores/params';
import { JsonMap } from '../../../../type';
import {
  ChangeCountHandler,
  DistinctHandler,
  GateHandler,
  LoggerObserver,
  MathOperationHandler,
  ParamEmitterComponent,
  SmsObserver,
  ThrottleHandler,
} from './components';

@Component({
  selector: 'fa-rete-canvas',
  templateUrl: './rete-canvas.component.html',
  styleUrls: ['./rete-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReteCanvasComponent implements AfterViewInit {
  @Input()
  set flow(value: JsonMap | undefined) {
    this._flow$.next(value);
  }
  get flow(): JsonMap | undefined {
    return this._flow$.value;
  }

  @Output() update = new EventEmitter();

  @ViewChild('nodeEditor', { static: true }) private _rete!: ElementRef;

  editor!: Rete.NodeEditor;

  private readonly _isReady$ = new BehaviorSubject<boolean>(false);
  private readonly _flow$ = new BehaviorSubject<JsonMap | undefined>(undefined);

  components = [
    new ParamEmitterComponent(this._paramsFacadeService),
    new MathOperationHandler(),
    new GateHandler(),
    new ChangeCountHandler(),
    new DistinctHandler(),
    new ThrottleHandler(),
    new LoggerObserver(),
    new SmsObserver(this._httpClient),
  ];

  constructor(private readonly _paramsFacadeService: ParamsFacadeService, private readonly _httpClient: HttpClient) {
    combineLatest([this._isReady$.pipe(filter(Boolean)), this._flow$]).subscribe(async ([, flow]) => {
      this.editor.clear();
      if (flow) {
        await this.editor.fromJSON(flow as any);
        // } else {
        //   await this.demoFlow();
      }

      this.editor.view.resize();
      this.editor.trigger('process');
      AreaPlugin.zoomAt(this.editor);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const container = this._rete.nativeElement;

    const editor = new Rete.NodeEditor('demo@0.2.0', container);
    this.editor = editor;

    editor.use(ConnectionPlugin);

    editor.use(AngularRenderPlugin);
    editor.use(ContextMenuPlugin);

    const engine = new Rete.Engine('demo@0.2.0');

    this.components.map(component => {
      editor.register(component);
      engine.register(component);
    });

    editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], async () => {
      await engine.abort();
      const json = editor.toJSON();
      await engine.process(json);
      this.update.emit(json);
    });

    editor.on(['nodetranslated'], async () => {
      await engine.abort();
      this.update.emit(editor.toJSON());
    });

    this._isReady$.next(true);
  }

  // async demoFlow(): Promise<void> {
  //   const n1 = await this.components[0].createNode({ out: 2 });
  //   const n2 = await this.components[0].createNode({ out: 0 });
  //   const add = await this.components[1].createNode();

  //   n1.position = [80, 200];
  //   n2.position = [80, 400];
  //   add.position = [500, 240];

  //   this.editor.addNode(n1);
  //   this.editor.addNode(n2);
  //   this.editor.addNode(add);

  //   this.editor.connect(<Rete.Output>n1.outputs.get('out'), <Rete.Input>add.inputs.get('in1'));
  //   this.editor.connect(<Rete.Output>n2.outputs.get('out'), <Rete.Input>add.inputs.get('in2'));
  // }
}
