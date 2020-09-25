import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardComponent} from './credit-card.component';
import {FormsModule} from '@angular/forms';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardComponent],
      imports: [
        FormsModule,
        MatSnackBarModule,
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
