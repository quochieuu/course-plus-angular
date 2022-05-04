import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {
  questions!: any;
  answer!: any;
  answerTaken!: any;
  quizId!: any;
  takenId!: any;

  timeLeft!: number;
  interval!: any;
  subscribeTimer: any;
  minutes: any;
  hours: any;
  seconds: any;
  breakPoints: [] = [];
  result!: any;
  duration!: any;

  constructor( public quizService: QuizService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
    ) {
      this.titleService.setTitle("Làm bài test - Course Plus");

      this.quizId = this.route.snapshot.params['quizId'];
      this.takenId = this.route.snapshot.params['takenId'];
    }

  ngOnInit() {
    this.getResult(this.takenId);
    this.getQuestions(this.quizId);
    this.getAnswerTaken(this.takenId);
  }


  startTimer() {

    console.log(this.result.duration);
    this.timeLeft = parseFloat(this.result.duration) * 60;
    console.log(this.timeLeft);

    this.interval = setInterval(() => {

      if(this.timeLeft > 0) {
        this.timeLeft--;

        var mins_num = this.timeLeft;
        console.log(mins_num);
        this.hours = ("0" + Math.floor(mins_num / 60)).slice(-2);
        this.minutes = ("0" + Math.floor((mins_num - ((this.hours * 3600)) / 60))).slice(-2);
        this.seconds = ("0" + Math.floor((mins_num * 60) - (this.hours * 3600) - (this.minutes * 60))).slice(-2);

        if(this.timeLeft > 60) {
          if(this.timeLeft % 5 === 0) {
            // update time
            this.updateDuration();
          }
        } else if(this.timeLeft >= 30 && this.timeLeft <= 60) {
          if(this.timeLeft % 3 === 0) {
            // update time
            this.updateDuration();
          }
        } else {
          if(this.timeLeft % 2 === 0) {
            // update time
            this.updateDuration();
          }
        }


      } else {
        if(this.timeLeft == null) {
          console.log("Timeleft get error");
        }
        console.log("EXPIRE");
        // Expire time thì tự động submit test
        this.pauseTimer();
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getQuestions(quizId: string) {
    this.quizService
      .getQuestionsOfQuiz(quizId)
      .subscribe((data: any) => {
        console.log(data);
        this.questions = data;
        this.startTimer();
      });
  }

  getAnswers(questionId: string) {
    this.quizService
      .getAnswersOfQuestion(questionId)
      .subscribe((data: any) => {
        console.log(data);
        this.answer = data;
      });
  }

  getAnswerTaken(takenId: string) {
    this.quizService
      .getAnswersTaken(takenId)
      .subscribe((data: any) => {
        this.answerTaken = data;
        console.log(this.answerTaken);
      });
  }

  chooseAnswer(quizTakenId: string, questionId: string, answerId: string, isCorrect: boolean) {
    this.quizService
      .chooseAnswer(quizTakenId, questionId, answerId, isCorrect)
      .subscribe((data: any) => {
        this.getAnswerTaken(quizTakenId);
        console.log(data);
      });
  }

  checkedAnswer(quizTakenId: string, questionId: string, answerId: string): boolean {
    var check = this.answerTaken.find((x: any) => x.quizTakenId === quizTakenId && x.questionId === questionId && x.answerId === answerId);

    if(check != null) {
      return true;
    }
    else {
      return false;
    }

    this.checkQuestionChecked(quizTakenId, questionId);
  }

  checkQuestionChecked(quizTakenId: string, questionId: string) {
    var check = this.answerTaken.find((x: any) => x.quizTakenId === quizTakenId && x.questionId === questionId && x.answerId != null);

    if(check != null) {
      return true;
    }
    else {
      return false;
    }
  }

  submitTest() {
    this.quizService
      .submitTest(this.takenId, String(this.timeLeft / 60))
      .subscribe((data: any) => {
        this.pauseTimer();
        this.ngZone.run(() => this.router.navigateByUrl('/quiz/result/' + this.quizId + '/' + this.takenId));
      });
  }

  updateDuration() {
    this.quizService
      .updateDuration(this.takenId, String(this.timeLeft / 60))
      .subscribe((data: any) => {
        console.log("saved at breakpoint" + this.timeLeft)
      });
  }

  getResult(quizId: string) {
    this.quizService
      .getResult(quizId)
      .subscribe((data: any) => {
        console.log(data);
        this.result = data;

        this.duration = this.result.duration;

        // var mins_num = this.result.durationLeft * 60;
        // this.hours = ("0" + Math.floor(mins_num / 60)).slice(-2);
        // this.minutes = ("0" + Math.floor((mins_num - ((this.hours * 3600)) / 60))).slice(-2);
        // this.seconds = ("0" + Math.floor((mins_num * 60) - (this.hours * 3600) - (this.minutes * 60))).slice(-2);
      });
  }

}
