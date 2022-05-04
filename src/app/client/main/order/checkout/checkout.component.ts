import { PaymentService } from './../../../../shared/services/payment.service';
import { CartService } from './../../../../shared/services/cart.service';
import { Title } from '@angular/platform-browser';
import { AccountService } from './../../../../shared/services/account.service';
import { OrderService } from './../../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  createForm: FormGroup;
  userData: any;
  cart: any;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
      private router: Router,
      public formBuilder: FormBuilder,
      private orderService: OrderService,
      private ngZone: NgZone,
      private accountService: AccountService,
      private paymentService: PaymentService,
      public cartService: CartService,
      private titleService: Title
    ) {

    this.titleService.setTitle("Đặt Hàng - Course Plus");

    this.createForm = this.formBuilder.group({
      orderEmail: [''],
      orderPhone: [''],
      orderName: [''],
      orderStatus: 0,
      paymentMethod: null,
      isVnpay: 0
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getCarts();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.userData = data;
        console.log(this.userData);
      });
  }

  getCarts() {
    this.cartService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.cart = data;
      });
  }

  createPayment(id: string) {
    this.paymentService
      .createPayment(id)
      .subscribe((data: any) => {
        console.log(data);
        window.location.href = data.payUrl;
      });
  }

  onSubmit(): any {
    this.orderService.createOrder(this.createForm.value)
    .subscribe((data: any) => {
      this.createPayment(data.id)
      // this.ngZone.run(() =>
      //   this.router.navigateByUrl('/')
      // );
    });
  }

}
