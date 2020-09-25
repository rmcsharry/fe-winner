import {Component, OnInit} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'wn-collect-summary',
  templateUrl: './collect-summary.component.html',
  styleUrls: ['./collect-summary.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: ['checkoutCollectSummary']
    }
  ]
})
export class CollectSummaryComponent implements OnInit {
  public orderNumber: string;

  constructor(private paymentService: PaymentService) {}

  /**
   * Init
   */
  ngOnInit(): void {
    this.orderNumber = this.paymentService.getOrderNumber();
  }

  /**
   * Returns a translatable title object including the order number
   */
  getTranslationInfo(): object {
    return {key: 'title', data: {part2: {number: this.orderNumber}}};
  }
}
