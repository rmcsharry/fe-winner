import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {activatedRouteStub} from '../../../test/helpers/activated-route.stub';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {getTranslocoModule} from '../../../transloco-testing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {routerStub} from '../../../test/helpers/router.stub';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule,
        MatDialogModule,
        getTranslocoModule({})
      ],
      providers: [activatedRouteStub, routerStub],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
