import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import { CreateQuestionComponent } from './create-question/create-question.component';

const routes: Routes = [
  { path: 'quiz', redirectTo: 'quiz/index', pathMatch: 'full'},
  { path: 'index', component: ListQuizzesComponent },
  { path: 'create', component: CreateComponent },
  { path: 'questions/:quizId', component: ListQuestionsComponent },
  { path: 'question/create/:quizId', component: CreateQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
