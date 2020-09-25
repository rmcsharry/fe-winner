import {Injectable, isDevMode} from '@angular/core';
import {UserOrder} from '@winnrshared';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from 'src/app/shared/services/user.service';
import {AngularFireFunctions} from '@angular/fire/functions';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private userId: string;

  constructor(
    private db: AngularFireDatabase,
    private readonly fns: AngularFireFunctions,
    private userService: UserService
  ) {
    this.userService.userId$.subscribe(userId => {
      this.userId = userId;
    });
  }

  /**
   * Get the order number for the user's basket
   *
   * @returns {Observable<string>}
   */
  public getOrderNumberForBasket(): Observable<string> {
    // must hook to userService first to guarantee we have the userId before
    // making the request to db
    return this.userService.userId$.pipe(
      switchMap((userId, _index) => {
        return this.db
          .object<string>(`/users/baskets/${userId}/orderNumber`)
          .valueChanges();
      })
    );
  }

  /**
   * Get a users specific order
   *
   * @param {string} orderNumber
   * @returns {Observable<UserOrder>}
   * @memberof OrderService
   */
  public getOrderByNumber(orderNumber: string): Observable<UserOrder> {
    return this.db
      .object<UserOrder>(`/users/orders/${this.userId}/${orderNumber}`)
      .valueChanges();
  }

  /**
   * Create a users order
   *
   * @returns {Promise<boolean>}
   * @memberof OrderService
   */
  public async createOrder(): Promise<boolean> {
    try {
      const callable = this.fns.httpsCallable('onCallCreateOrder');
      await callable({}).toPromise();
      return true;
    } catch (error) {
      if (isDevMode()) console.log('Order creation failed:', error);
      return false;
    }
  }
}
