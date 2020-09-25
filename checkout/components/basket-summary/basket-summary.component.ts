import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {BasketItem} from '@winnrshared';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {takeUntil} from 'rxjs/operators';
import {DestroyService} from 'src/app/shared/services/destroy.service';

@Component({
  selector: 'wn-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['checkoutBasketSummary']}]
})
export class BasketSummaryComponent implements OnInit {
  @Input() basketItems$: Observable<BasketItem[]>;
  @Input() isBasketEmpty$: Observable<boolean>;
  totalRecommendedPrice: number = 0;
  totalBasketPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private destroy$: DestroyService) {}

  /**
   * Initialise
   */
  ngOnInit(): void {
    this.basketItems$?.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.calculateBasketTotals(items);
    });
  }

  /**
   * Calculates totals for the basket
   *
   * @param {items} array of basket items
   */
  private calculateBasketTotals(items: BasketItem[]) {
    this.totalBasketPrice = items.reduce((a, b) => {
      return a + b.productPrice * b.quantity;
    }, 0);
    this.totalRecommendedPrice = items.reduce((a, b) => {
      return a + b.recommendedPrice * b.quantity;
    }, 0);
    this.totalQuantity = items.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
  }
}
