import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { PaymentPaypalComponent } from './payment-paypal/payment-paypal.component';
import { PaymentMomoComponent } from './payment-momo/payment-momo.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'method', component: PaymentMethodComponent },
  { path: 'pay-with-momo', component: PaymentMomoComponent },
  { path: 'pay-with-paypal', component: PaymentPaypalComponent },
  { path: 'success', component: PaymentSuccessfulComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
