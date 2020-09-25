import {TestBed} from '@angular/core/testing';

import {OrderService} from './order.service';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {getTranslocoModule} from 'src/app/transloco-testing.module';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
