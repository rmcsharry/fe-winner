import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// MODULES
import {CheckoutRoutingModule} from './checkout-routing.module';
import {SharedModule} from '../shared/shared.module';
// COMPONENTS
import {BasketComponent} from './components/basket/basket.component';
import {BasketSummaryComponent} from './components/basket-summary/basket-summary.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {CheckoutDesktopComponent} from './components/checkout-desktop/checkout-desktop.component';
import {CheckoutMobileComponent} from './components/checkout-mobile/checkout-mobile.component';
import {BasketEmptyComponent} from './components/basket-empty/basket-empty.component';
import {VatRegionDialogComponent} from './dialogs/vat-region-dialog/vat-region-dialog.component';
import {VatRegionSelectComponent} from './components/vat-region-select/vat-region-select.component';
import {CreditCardComponent} from './components/credit-card/credit-card.component';
import {DiscountDialogComponent} from './dialogs/discount-dialog/discount-dialog.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';
import {PanelRadioButtonComponent} from './components/panel-radio-button/panel-radio-button.component';
import {CollectSummaryComponent} from './components/collect-summary/collect-summary.component';
import {StepBasketComponent} from './components/step-basket/step-basket.component';
import {StepPaymentComponent} from './components/step-payment/step-payment.component';
import {StepCollectComponent} from './components/step-collect/step-collect.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketEmptyComponent,
    BasketSummaryComponent,
    CheckoutComponent,
    CheckoutDesktopComponent,
    CheckoutMobileComponent,
    CollectSummaryComponent,
    CreditCardComponent,
    DiscountDialogComponent,
    OrderSummaryComponent,
    PanelRadioButtonComponent,
    StepBasketComponent,
    StepCollectComponent,
    StepPaymentComponent,
    VatRegionDialogComponent,
    VatRegionSelectComponent
  ],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule]
})
export class CheckoutModule {}
