import { PaymentPaypalComponent } from './payment-paypal/payment-paypal.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    PaymentPaypalComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    HttpClientModule,
    NgxPayPalModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PaymentModule { }
