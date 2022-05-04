import { BannerService } from './../../../../shared/services/banner.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-banners.component.scss']
})
export class ListBannersComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  banners: any = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.bannerService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.banners = data;
      });
  }

  delete(id: string): void {
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
        text: 'Xác nhận xóa banner?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getAll();

          this.bannerService.delete(id).subscribe((res) => {
          this.getAll();
          });
          this.getAll();
          this.getAll();

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
