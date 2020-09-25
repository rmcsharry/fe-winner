import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {StepBasketComponent} from './components/step-basket/step-basket.component';
import {StepCollectComponent} from './components/step-collect/step-collect.component';
import {StepPaymentComponent} from './components/step-payment/step-payment.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {path: 'basket', component: StepBasketComponent},
      {path: 'payment', component: StepPaymentComponent},
      {path: 'collect', component: StepCollectComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}
