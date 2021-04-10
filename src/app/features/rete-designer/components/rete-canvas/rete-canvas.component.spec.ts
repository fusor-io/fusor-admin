import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteCanvasComponent } from './rete-canvas.component';

describe('ReteCanvasComponent', () => {
  let component: ReteCanvasComponent;
  let fixture: ComponentFixture<ReteCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReteCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReteCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
