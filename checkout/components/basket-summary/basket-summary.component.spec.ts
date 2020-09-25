import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketSummaryComponent} from './basket-summary.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {getTranslocoModule} from 'src/app/transloco-testing.module';

describe('BasketSummaryComponent', () => {
  let component: BasketSummaryComponent;
  let fixture: ComponentFixture<BasketSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketSummaryComponent],
      imports: [getTranslocoModule({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
