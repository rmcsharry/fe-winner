import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StepCollectComponent} from './step-collect.component';

describe('StepCollectComponent', () => {
  let component: StepCollectComponent;
  let fixture: ComponentFixture<StepCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepCollectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
