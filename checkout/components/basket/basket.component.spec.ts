import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketComponent} from './basket.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {getTranslocoModule} from 'src/app/transloco-testing.module';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [getTranslocoModule({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
