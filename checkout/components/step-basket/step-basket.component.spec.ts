import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StepBasketComponent} from './step-basket.component';

describe('StepBasketComponent', () => {
  let component: StepBasketComponent;
  let fixture: ComponentFixture<StepBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepBasketComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
