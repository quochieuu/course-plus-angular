import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { QuizRoutingModule } from './quiz-routing.module';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateComponent } from './create/create.component';
import { CreateQuestionComponent } from './create-question/create-question.component';

@NgModule({
  declarations: [
    ListQuizzesComponent,
    CreateComponent,
    ListQuestionsComponent,
    CreateQuestionComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularEditorModule
  ]
})
export class QuizModule { }
