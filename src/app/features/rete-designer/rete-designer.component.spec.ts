import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteDesignerComponent } from './rete-designer.component';

describe('ReteDesignerComponent', () => {
  let component: ReteDesignerComponent;
  let fixture: ComponentFixture<ReteDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReteDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReteDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
