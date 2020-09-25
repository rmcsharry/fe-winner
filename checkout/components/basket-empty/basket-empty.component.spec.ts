import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketEmptyComponent} from './basket-empty.component';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {routerStub} from 'src/app/test/helpers/router.stub';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('BasketEmptyComponent', () => {
  let component: BasketEmptyComponent;
  let fixture: ComponentFixture<BasketEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketEmptyComponent],
      imports: [
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule
      ],
      providers: [routerStub],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
