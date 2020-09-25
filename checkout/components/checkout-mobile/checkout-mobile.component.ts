import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {BasketItem} from '@winnrshared';

@Component({
  selector: 'wn-checkout-mobile',
  templateUrl: './checkout-mobile.component.html',
  styleUrls: ['./checkout-mobile.component.scss']
})
export class CheckoutMobileComponent {
  @Input() basketItems$: Observable<BasketItem[]>;
  @Input() checkoutStep: number;
  @Input() isBasketEmpty$: Observable<boolean>;
}
