import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { TakeQuizResultComponent } from './take-quiz-result/take-quiz-result.component';


@NgModule({
  declarations: [
    ListQuizzesComponent,
    TakeQuizComponent,
    TakeQuizResultComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NgxPaginationModule,
  ]
})
export class QuizModule { }
