import {
  Component,
  isDevMode,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {UserOrder} from '@winnrshared';
import {MatDialog} from '@angular/material/dialog';
import {DiscountDialogComponent} from '../../dialogs/discount-dialog/discount-dialog.component';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';
import {DestroyService} from 'src/app/shared/services/destroy.service';
import {takeUntil} from 'rxjs/operators';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'wn-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['checkoutOrderSummary']}]
})
export class OrderSummaryComponent implements OnInit {
  @Output() orderNumberCreated: EventEmitter<string> = new EventEmitter();
  order$: Observable<UserOrder>;
  private orderNumber: string;
  public isCardCompleted$: Observable<boolean>;
  public isProcessingPayment$: Observable<boolean>;

  constructor(
    public translateService: TranslocoService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private destroy$: DestroyService
  ) {}

  /**
   * Init
   *
   * @memberof OrderSummaryComponent
   */
  ngOnInit(): void {
    this.getOrder();
    this.isCardCompleted$ = this.paymentService.getIsCardCompleted$;
    this.isProcessingPayment$ = this.paymentService.getIsProcessingPayment$;
  }
  /**
   * Opens the discount dialog
   *
   * @memberof OrderSummaryComponent
   */
  openDiscountDialog(): void {
    const dialogRef = this.dialog.open(DiscountDialogComponent, {
      width: '450px',
      height: '282px',
      disableClose: false,
      data: {
        orderNumber: this.orderNumber
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      if (isDevMode()) {
        console.log('closed');
      }
    });
  }

  /**
   * Gets the order (if not yet created it creates it)
   *
   * @memberof OrderSummaryComponent
   */
  onBuyClick() {
    this.paymentService.Pay();
  }

  /**
   * Gets the order (if not yet created it creates it)
   *
   * @memberof OrderSummaryComponent
   */
  private getOrder() {
    this.orderService
      .getOrderNumberForBasket()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async orderNumber => {
        if (orderNumber) {
          this.orderNumber = orderNumber;
          this.paymentService.setOrderNumber(orderNumber);
          this.order$ = this.orderService.getOrderByNumber(orderNumber);
        } else {
          await this.orderService.createOrder();
        }
      });
  }
}
