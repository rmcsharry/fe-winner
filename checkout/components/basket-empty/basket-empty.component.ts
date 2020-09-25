import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'wn-basket-empty',
  templateUrl: './basket-empty.component.html',
  styleUrls: ['./basket-empty.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['checkoutBasket']}]
})
export class BasketEmptyComponent {
  constructor(private router: Router, public userService: UserService) {}

  /**
   * Goto store when shopping button is clicked
   */
  onStartShopping() {
    this.router.navigate(['/store']);
  }
}
