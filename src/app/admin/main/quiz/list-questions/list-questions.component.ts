import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { QuizService } from './../../../../shared/services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  questions: any = [];
  totalItems: any;
  quizId: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';

  showTab = 0;
  isHide = 0;

  closeResult: string | undefined;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    public quizService: QuizService,
    private modalService: NgbModal,
    private titleService: Title
  ) {
    this.titleService.setTitle("Danh sách câu hỏi trắc nghiệm - Course Plus Admin");

    this.quizId = this.route.snapshot.params['quizId'];
  }

  ngOnInit(): void {
    this.getPage(this.quizId, this.p, this.pageSize, this.query);
  }

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
  }

  // Modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // End modal

  handlePageChange(event: number): void {
    this.p = event;
    this.getPage(this.quizId, this.p, this.pageSize, this.query);
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getPage(this.quizId, this.p, this.pageSize, this.query);
    this.handlePageChange(this.p);
  }

  handleSearch(ev: any) {
    this.query = ev.target.value;
    this.getPage(this.quizId, this.p, this.pageSize, this.query);
  }

  getPage(quizId: string, p: number, pageSize: number, query: string) {
    this.quizService
      .getQuestions(quizId, p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.questions = data.items;
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
        text: 'Xác nhận xóa câu hỏi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getPage(this.quizId, this.p, this.pageSize, this.query);

          this.quizService.deleteQuestion(id).subscribe((res) => {
            this.questions = this.questions.filter(
              (item: { id: string }) => item.id !== id
            );
          });

          for (let i = 0; i < 4; i++) {
            this.getPage(this.quizId, this.p, this.pageSize, this.query);
          }

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
