import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public cartService: CartService,
    private titleService: Title
    ) {
      this.titleService.setTitle("Giỏ hàng của bạn - Course Plus");
     }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.cartService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.cart = data;
      });
  }

  removeItemFromCart(id: string) {
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
        text: 'Xác nhận xóa khoá học này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.cartService
            .deleteItemFromCart(id)
            .subscribe((data: any) => {
              this.getCarts();
            });

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });


  }

}
