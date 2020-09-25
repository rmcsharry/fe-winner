import {Component, Input} from '@angular/core';
import {BasketItem, TranslatedString} from '@winnrshared';
import {Observable} from 'rxjs';
import {TranslocoService, TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'wn-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['checkoutBasket']}]
})
export class BasketComponent {
  @Input() basketItems$: Observable<BasketItem[]>;
  @Input() isBasketEmpty$: Observable<boolean>;
  deletedItem: TranslatedString;

  constructor(public translateService: TranslocoService) {}

  /**
   * Ordering Function
   */
  trackByFn(_index, item) {
    return item.productId;
  }

  /**
   * Handle when an item is deleted from the basket
   */
  handleItemDeleted(value: TranslatedString) {
    this.deletedItem = value;
  }
}
