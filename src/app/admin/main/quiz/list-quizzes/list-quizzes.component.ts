import { Title } from '@angular/platform-browser';
import { QuizService } from './../../../../shared/services/quiz.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-quizzes.component.scss']
})
export class ListQuizzesComponent implements OnInit {

  quizzes: any = [];
  totalItems: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';

  showTab = 0;
  isHide = 0;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public quizService: QuizService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Danh sách bài trắc nghiệm - Course Plus Admin");
  }

  ngOnInit(): void {
    this.getPage(this.p, this.pageSize, this.query);
  }

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
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
    this.quizService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.quizzes = data.items;
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
        text: 'Xác nhận xóa quiz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getPage(this.p, this.pageSize, this.query);

          this.quizService.delete(id).subscribe((res) => {
            this.quizzes = this.quizzes.filter(
              (item: { id: string }) => item.id !== id
            );
          });

          for (let i = 0; i < 4; i++) {
            this.getPage(this.p, this.pageSize, this.query);
          }

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
