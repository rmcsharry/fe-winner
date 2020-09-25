import {Injectable} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private fns: AngularFireFunctions) {}

  /**
   * get discount code result
   */
  public applyDiscount(
    discountCode: string,
    orderNumber: string
  ): Observable<any> {
    const onCallFunction = this.fns.httpsCallable('onCallAddDiscount');
    return onCallFunction({
      discountCode,
      orderNumber
    });
  }
}
