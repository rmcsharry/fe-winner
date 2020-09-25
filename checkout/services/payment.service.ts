import {Injectable, isDevMode} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Observable, Subject} from 'rxjs';
import {PaymentProcessorType} from 'src/winnrshared/enums/PaymentProcessorType.enum';
import {switchMap, take} from 'rxjs/operators';
import {
  SnackBarService,
  SnackBarType
} from 'src/app/shared/services/snack-bar.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from 'src/app/shared/services/user.service';
import {OrderStatusType} from 'src/winnrshared/enums/OrderStatusType.enum';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // TODO: these first two public objects should be made private
  public stripe: any;
  public selectedProcessor: PaymentProcessorType = PaymentProcessorType.STRIPE;
  private isCardCompleted$ = new Subject<boolean>();
  private isProcessingPayment$ = new Subject<boolean>();
  private isPaymentSucceeded$ = new Subject<boolean>();
  private cardNumber: any; // the stripe cardNumber element
  private orderNumber: string;
  private userId: string;

  constructor(
    private readonly fns: AngularFireFunctions,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private db: AngularFireDatabase
  ) {
    this.userService.userId$.subscribe(userId => {
      this.userId = userId;
    });
  }

  /**
   * Setter for isProcessingPayment
   *
   * @param {boolean} value
   * @memberof PaymentService
   */
  public setIsProcessingPayment(value: boolean): void {
    this.isProcessingPayment$.next(value);
  }

  /**
   * Getter for isProcessingPayment
   *
   * @returns {Observable<boolean>}
   * @memberof PaymentService
   */
  public get getIsProcessingPayment$(): Observable<boolean> {
    return this.isProcessingPayment$.asObservable();
  }

  /**
   * Setter for isCardCompleted
   *
   * @param {boolean} value
   * @memberof PaymentService
   */
  public setIsCardCompleted(value: boolean): void {
    this.isCardCompleted$.next(value);
  }

  /**
   * Getter for isCardCompleted
   *
   * @returns {Observable<boolean>}
   * @memberof PaymentService
   */
  public get getIsCardCompleted$(): Observable<boolean> {
    return this.isCardCompleted$.asObservable();
  }

  /**
   * Setter for isPaymentCompleted
   *
   * @param {boolean} value
   * @memberof PaymentService
   */
  public setIsPaymentSucceeded(value: boolean): void {
    this.isPaymentSucceeded$.next(value);
  }

  /**
   * Getter for isPaymentCompleted
   *
   * @returns {Observable<boolean>}
   * @memberof PaymentService
   */
  public get getIsPaymentSucceeded$(): Observable<boolean> {
    return this.isPaymentSucceeded$.asObservable();
  }

  /**
   * Store the card number in a service property
   * (as at least one element must be provided to Stripe)
   *
   * @param {Card} card
   * @memberof PaymentService
   */
  public setCard(cardNumber: any) {
    this.cardNumber = cardNumber;
  }

  /**
   * Store the order number in a service property
   *
   * @param {string} orderNumber
   * @memberof PaymentService
   */
  public setOrderNumber(orderNumber: string) {
    this.orderNumber = orderNumber;
  }

  /** Get the order number from a service property
   *
   * @returns {string} orderNumber
   * @memberof PaymentService
   */
  public getOrderNumber(): string {
    return this.orderNumber;
  }

  /**
   * Calls the appropriate payment processor payment method
   *
   * @memberof PaymentService
   */
  public Pay() {
    this.setIsProcessingPayment(true);
    if (this.selectedProcessor === PaymentProcessorType.STRIPE) {
      this.confirmStripe()
        .pipe(take(1))
        .subscribe((result: any) => {
          this.setIsProcessingPayment(false);
          if (result.error) {
            this.handleStripeFailure(result);
          } else {
            this.handleStripeSuccess(result);
          }
        });
    } else {
      // TODO: pay via paypal
      console.log('todo: pay via paypal');
    }
  }

  /**
   * Calls stripe payment confirmation
   *
   * @memberof PaymentService
   * @returns {Observable<unknown>}
   */
  private confirmStripe(): Observable<unknown> {
    return this.getPaymentIntent().pipe(
      take(1),
      switchMap(intent =>
        this.stripe.confirmCardPayment(intent.data.client_secret, {
          payment_method: {
            card: this.cardNumber
          }
        })
      )
    );
  }

  /**
   * Handles stripe payment success
   *
   * @param {any} result
   * @memberof PaymentService
   */
  private handleStripeSuccess(result: any) {
    if (result.paymentIntent.status === 'succeeded') {
      this.snackBarService.open(
        'payment',
        'snackbar.paymentSuccess.title',
        'snackbar.paymentSuccess.message',
        SnackBarType.SUCCESS,
        'done'
      );
      this.handlePaymentSuccess(result);
    } else {
      if (isDevMode()) console.log('unexpected stripe payment result', result);
    }
  }

  /**
   * Handles stripe payment failure
   *
   * @param {any} result
   * @memberof PaymentService
   */
  private handleStripeFailure(result: any) {
    this.snackBarService.open(
      'payment',
      'snackbar.paymentFailed.title',
      {
        key: 'snackbar.paymentFailed.message',
        data: {reason: result.error.message}
      },
      SnackBarType.ERROR,
      'error'
    );
    if (isDevMode()) console.error('payment failed', result.error.message);
  }

  /**
   * Creates or retrives a stripe payment intent from backend
   *
   * @param {string} orderNumber
   * @returns {Observable<object>}
   * @memberof PaymentService
   */
  private getPaymentIntent(): Observable<any> {
    try {
      const callable = this.fns.httpsCallable('onCallRequestPaymentIntent');
      return callable({orderNumber: this.orderNumber});
    } catch (error) {
      if (isDevMode()) console.error('Payment Intent failed: ', error);
    }
  }

  /**
   * Handle payment success - updates db and sets flag
   *
   * @param {any} result
   * @memberof PaymentService
   */
  private handlePaymentSuccess(result: any) {
    const update = {};
    update[
      `/users/orders/${this.userId}/${this.orderNumber}/paymentTransaction`
    ] = result;
    update[`/users/orders/${this.userId}/${this.orderNumber}/orderStatusType`] =
      OrderStatusType.SUCCESS;
    update[`/users/baskets/${this.userId}`] = null;
    this.db.object(`/users/baskets/${this.userId}`).remove();
    this.setIsPaymentSucceeded(true);
  }
}
