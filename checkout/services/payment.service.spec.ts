import {TestBed} from '@angular/core/testing';

import {PaymentService} from './payment.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {getTranslocoModule} from 'src/app/transloco-testing.module';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
