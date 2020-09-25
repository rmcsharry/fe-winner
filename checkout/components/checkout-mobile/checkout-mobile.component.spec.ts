import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutMobileComponent} from './checkout-mobile.component';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CheckoutMobileComponent', () => {
  let component: CheckoutMobileComponent;
  let fixture: ComponentFixture<CheckoutMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutMobileComponent],
      providers: [MatIconModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
