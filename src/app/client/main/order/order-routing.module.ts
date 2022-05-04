import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-order', component: ListOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
