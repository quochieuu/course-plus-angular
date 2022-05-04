import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, NgZone } from '@angular/core';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
  selector: 'app-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
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

  constructor(
    public quizService: QuizService,
    private titleService: Title,
    private router: Router,
    private ngZone: NgZone,) {
      this.titleService.setTitle("Trắc nghiệm mới nhất - Course Plus");
    }

  ngOnInit() {
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
    this.quizService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.quizzes = data.items;
        this.totalItems = data.totalRecords;
      });
  }

  joinTest(quizId: string) {
    this.quizService.takeQuiz(quizId)
    .subscribe((data: any) => {
      // console.log(data);
      this.ngZone.run(() => this.router.navigateByUrl('/quiz/test/' + quizId + '/' + data));
    });
  }

}
