import {TestBed} from '@angular/core/testing';

import {DiscountService} from './discount.service';
import {AngularFireFunctions} from '@angular/fire/functions';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AngularFireFunctions, useValue: {}}]
    });
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
