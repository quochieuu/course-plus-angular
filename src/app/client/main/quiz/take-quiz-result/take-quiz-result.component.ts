import { QuizService } from 'src/app/shared/services/quiz.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-take-quiz-result',
  templateUrl: './take-quiz-result.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './take-quiz-result.component.scss']
})
export class TakeQuizResultComponent implements OnInit {
  quizId!: any;
  takenId!: any;
  result!: any;

  minutes: any;
  hours: any;
  seconds: any;

  constructor(public quizService: QuizService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) {
      this.titleService.setTitle("Kết quả - Course Plus");

      this.quizId = this.route.snapshot.params['quizId'];
      this.takenId = this.route.snapshot.params['takenId'];
    }

  ngOnInit() {
    this.getResult(this.takenId);
  }

  getResult(quizId: string) {
    this.quizService
      .getResult(quizId)
      .subscribe((data: any) => {
        console.log(data);
        this.result = data;

        var mins_num = this.result.durationLeft * 60;
        this.hours = ("0" + Math.floor(mins_num / 60)).slice(-2);
        this.minutes = ("0" + Math.floor((mins_num - ((this.hours * 3600)) / 60))).slice(-2);
        this.seconds = ("0" + Math.floor((mins_num * 60) - (this.hours * 3600) - (this.minutes * 60))).slice(-2);
      });
  }

}
