import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryComponent} from './order-summary.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase),
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [OrderSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
