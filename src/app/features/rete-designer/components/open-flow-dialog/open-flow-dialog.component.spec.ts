import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFlowDialogComponent } from './open-flow-dialog.component';

describe('OpenFlowDialogComponent', () => {
  let component: OpenFlowDialogComponent;
  let fixture: ComponentFixture<OpenFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
