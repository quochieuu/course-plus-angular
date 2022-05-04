import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  books: any = [];
  totalItems: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public bookService: BookService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Quản lý sách - Course Plus Admin");
  }

  ngOnInit(): void {
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageChange(event: number): void {
    this.p = event;
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getPage(this.p, event.target.value, this.query);
    this.handlePageChange(this.p);
  }

  handleSearch(ev: any) {
    this.query = ev.target.value;
    this.getPage(this.p, this.pageSize, ev.target.value);
  }

  getPage(p: number, pageSize: number, query: string) {
    this.bookService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.books = data.items;
        this.totalItems = data.totalRecords;
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
        text: 'Xác nhận xóa sách?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getPage(this.p, this.pageSize, this.query);

          this.bookService.delete(id).subscribe((res) => {
            this.books = this.books.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getPage(this.p, this.pageSize, this.query);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
