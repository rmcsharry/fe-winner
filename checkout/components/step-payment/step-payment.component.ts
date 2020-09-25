import {Component, OnInit} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {PaymentProcessorType} from 'src/winnrshared/enums/PaymentProcessorType.enum';
import {PaymentService} from '../../services/payment.service';

@Component({
  templateUrl: './step-payment.component.html',
  styleUrls: ['./step-payment.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['checkoutPayment']}]
})
export class StepPaymentComponent implements OnInit {
  isCardChecked: boolean = true;
  isPaypalChecked: boolean = false;

  constructor(private paymentService: PaymentService) {}

  /**
   * OnInit
   *
   * @memberof StepPaymentComponent
   */
  ngOnInit(): void {}

  /**
   * Handles clicking to change payment type to card
   *
   * @memberof StepPaymentComponent
   */
  onCardClick() {
    this.isCardChecked = true;
    this.isPaypalChecked = false;
    this.paymentService.selectedProcessor = PaymentProcessorType.STRIPE;
  }

  /**
   * Handles clicking to change payment type to paypal
   *
   * @memberof StepPaymentComponent
   */
  onPaypalClick() {
    this.isCardChecked = false;
    this.isPaypalChecked = true;
    this.paymentService.selectedProcessor = PaymentProcessorType.PAYPAL;
  }
}
