import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import { TakeQuizResultComponent } from './take-quiz-result/take-quiz-result.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ListQuizzesComponent },
  { path: 'test/:quizId/:takenId', component: TakeQuizComponent },
  { path: 'result/:quizId/:takenId', component: TakeQuizResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
