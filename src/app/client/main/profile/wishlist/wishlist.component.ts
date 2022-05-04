import { Wishlist } from './../../../../shared/models/wishlist';
import { Course } from './../../../../shared/models/course';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, NgZone } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  courses: Wishlist[] = [];
  loading = false;
  empty!: any;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(private wishlistService: WishlistService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private titleService: Title) {
      this.titleService.setTitle("Khoá học đã lưu - Course Plus");
    }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this.wishlistService
      .getAll()
      .subscribe((data: any) => {
        this.courses = data;
        console.log(this.courses)
        this.loading = false;
        if(data.length == 0) {
          this.empty = "Không có khoá học nào được lưu!";
        } else {
          this.empty = "";
        }
      }, () => {
        this.loading = true;
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
        text: 'Xác nhận xóa khoá học đã lưu?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.wishlistService.delete(id).subscribe((res) => {
            this.getAll();
          });
          this.getAll();this.getAll();
          this.getAll();this.getAll();
          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
