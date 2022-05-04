import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
declare var require: any


@Component({
  selector: 'app-payment-momo',
  templateUrl: './payment-momo.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './payment-momo.component.scss']
})
export class PaymentMomoComponent implements OnInit {

  loginStatus!: any;
  customerInfo!: any;
  paymentInfo!: any;
  paymentType: number = 0;
  signature!: String;

  momoPaymentRequest: any = {
    accessKey: "vj9xQ0HBnuhRDCPf",
    partnerCode: "MOMOTZVE20201223",
    requestType: "captureMoMoWallet",
    notifyUrl: "https://momo.vn",
    returnUrl: "https://momo.vn",
    orderId: "MM1540456472575",
    amount: "1000",
    orderInfo: "SDK team.",
    requestId: "MM1540456472575",
    extraData: "email=abc@gmail.com",
    signature: ""
  }

  message!: string;
  momoSerectKey: string = "0YFtOh9qVuyVu8O5kQ1gd9rGCTFMYqjh";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.signature = this.createHmacSha256String("", "");
  }

  payment() {

    //Test generate random order id
    let r = Math.random().toString(36).substring(7);
    //Before payment
    this.momoPaymentRequest.amount = "100000";
    this.momoPaymentRequest.orderInfo = "Thanh toán trực tuyến MoMo";


    this.momoPaymentRequest.orderId = r;
    this.message = "partnerCode=" + this.momoPaymentRequest.partnerCode +
    "&accessKey=" + this.momoPaymentRequest.accessKey +
    "&requestId=" + this.momoPaymentRequest.requestId +
    "&amount=" + this.momoPaymentRequest.amount +
    "&orderId=" + this.momoPaymentRequest.orderId +
    "&orderInfo=" + this.momoPaymentRequest.orderInfo +
    "&returnUrl=" + this.momoPaymentRequest.returnUrl +
    "&notifyUrl=" + this.momoPaymentRequest.notifyUrl +
    "&extraData=" + this.momoPaymentRequest.extraData;
    //Create signature
    this.momoPaymentRequest.signature = this.createHmacSha256String(this.message, this.momoSerectKey);
    this.momoPayment();
  }

  momoPayment() {
    this.http.post("https://cors-anywhere.herokuapp.com/https://test-payment.momo.vn/gw_payment/transactionProcessor",
      this.momoPaymentRequest).subscribe(
        result => {
          var res: any = result;
          if(res.errorCode !== 0){
            alert("Đã xảy ra lỗi bất thường.");
          }
          else{
            //Create order success information
            localStorage.setItem('orderSuccessInfo', JSON.stringify({"cusInfo": this.customerInfo, "paymentInfo": this.paymentInfo}));
            window.open(res.payUrl, '_blank');
            setTimeout(() => {
              this.router.navigate(['/order-success'], {relativeTo: this.route});
            }, 3000);
          }
        },
        error => {
          console.log(error);
        }
      )
  }



    createHmacSha256String(message: string, serectKey: string) {
      let CryptoJS = require('crypto-js');
      let signature = crypto.algo.HMAC.create(CryptoJS.algo.SHA256
        , serectKey);
      signature.update(message);
      var signatureHex = signature.finalize();
      return signatureHex.toString(CryptoJS.enc.Hex);
    }

    momo(): void {
      const orderMomoId = new Date().getTime().toString();
      const signatureString = 'partnerCode=' + 'MOMODOW720200810' +
        '&accessKey=' + 'NNbGn5noGrZseuzL' +
        '&requestId=' + orderMomoId +
        '&amount=' + "120000" +
        '&orderId=' + orderMomoId +
        '&orderInfo=' + 'Thanh toán đơn hàng' +
        '&returnUrl=' + 'http://localhost:4200/checkout/payment' +
        '&notifyUrl=' + 'https://momo.vn' +
        '&extraData=' + 'email=abc@gmail.com';
      const secret = 'Ryz4fRw1pukvVm2ZrnoWxSwGspMaH46f';
      const signatureHex = CryptoJS.HmacSHA256(signatureString, secret);
      let sendMomoRequest: {
        accessKey: string;
        partnerCode: string;
        requestType: string;
        notifyUrl: string;
        returnUrl: string;
        orderId: string;
        amount: string;
        orderInfo: string;
        requestId: string;
        extraData: string;
        signature: string;

      };
      let receiverMomoRequest: {
        requestId: string;
        errorCode: string;
        orderId: string;
        message: string;
        localMessage: string;
        requestType: string;
        payUrl: string;
        signature: string;
      };
      sendMomoRequest = {
        accessKey: 'NNbGn5noGrZseuzL',
        partnerCode: 'MOMODOW720200810',
        requestType: 'captureMoMoWallet',
        notifyUrl: 'https://momo.vn',
        returnUrl: 'http://localhost:4200/checkout/payment',
        orderId: orderMomoId,
        amount: "120000",
        orderInfo: 'Thanh toán đơn hàng',
        requestId: orderMomoId,
        extraData: 'email=abc@gmail.com',
        signature: signatureHex.toString()
      };
      this.http.post<any>("https://cors-anywhere.herokuapp.com/https://test-payment.momo.vn/gw_payment/transactionProcessor", sendMomoRequest);

      // this.orderService.getReceiverMomoRequest(sendMomoRequest).toPromise().then(next => {
      //   receiverMomoRequest = next;
      //   console.log(receiverMomoRequest);
      //   if (receiverMomoRequest.errorCode.toString() === '0') {
      //     window.location.href = receiverMomoRequest.payUrl;

      //   } else {
      //     this.notificationService.config.horizontalPosition = 'center';
      //     this.notificationService.create('Có lỗi khi liên kết với MoMo, vui lòng thử lại !');
      //   }
      // });
    }

}
