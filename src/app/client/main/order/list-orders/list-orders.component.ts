import { PaymentService } from './../../../../shared/services/payment.service';
import { Title } from '@angular/platform-browser';
import { Order } from './../../../../shared/models/order';
import { OrderService } from './../../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders: any = [Order]
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  showTab = 0;
  isHide = 0;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private titleService: Title) {
      this.titleService.setTitle("Đơn hàng của bạn - Course Plus");
   }

  ngOnInit() {
    this.getOrders();
  }

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
  }

  getOrders(): void {
    this.orderService.getAll()
    .subscribe((data: any) => {
      this.orders = data;

      console.log(this.orders);
    });
  }

    cancelOrder(id: string): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            'btn btn-success',
          cancelButton:
            'btn btn-default',
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          text: 'Xác nhận huỷ đơn hàng?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.orderService.cancelOrder(id)
            .subscribe((data: any) => {
              this.getOrders();
              this.getOrders();
              this.getOrders();
              this.getOrders();
            });

            swalWithBootstrapButtons.fire('Xóa thành công!');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire('Hủy thành công!');
          }
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

  deleteOrder(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa đơn hàng?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.orderService.deleteOrder(id)
          .subscribe((data: any) => {
            this.getOrders();
            this.getOrders();
            this.getOrders();
            this.getOrders();
          });

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
