import {Component, OnInit} from '@angular/core';
import {BasketItem} from '@winnrshared';
import {BehaviorSubject, Observable} from 'rxjs';
import {flatMap, switchMap, takeUntil} from 'rxjs/operators';
import {DestroyService} from 'src/app/shared/services/destroy.service';
import {UserBasketService} from 'src/app/shared/services/user-basket.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  templateUrl: './step-basket.component.html',
  styleUrls: ['./step-basket.component.scss']
})
export class StepBasketComponent implements OnInit {
  public isBasketEmpty$ = new BehaviorSubject<boolean>(false);
  public basketItems$: Observable<BasketItem[]>;
  public checkoutStep: number = 0;

  constructor(
    private userService: UserService,
    private userBasketService: UserBasketService,
    private destroy$: DestroyService
  ) {}

  /**
   * Init
   */
  ngOnInit(): void {
    this.getBasketData();
  }

  /**
   * Get basket items and set empty basket flag
   */
  private getBasketData() {
    // We delay getting items until user is available
    this.basketItems$ = this.userService.userId$.pipe(
      flatMap(_userId => this.userBasketService.getAllBasketItems())
    );
    // Use switchMap to subscribe to the returned basket items, thus
    // causing the empty flag only to be set when we know for sure
    // if the basket is actually empty (otherwise user will see the empty basket
    // flash on screen before their items are loaded)
    this.userService.userId$
      .pipe(
        switchMap(_userId => this.basketItems$),
        takeUntil(this.destroy$)
      )
      .subscribe(items => {
        if (items.length > 0) this.isBasketEmpty$.next(false);
        else this.isBasketEmpty$.next(true);
      });
  }
}
