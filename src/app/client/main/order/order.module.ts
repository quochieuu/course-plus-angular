import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CheckoutComponent,
    ListOrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrderModule { }
