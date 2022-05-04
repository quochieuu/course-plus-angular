import { ListSuggestionsComponent } from './list-suggestions/list-suggestions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateResponseComponent } from './create-response/create-response.component';

const routes: Routes = [
  { path: 'chat-bot', redirectTo: 'chat-bot/index', pathMatch: 'full'},
  { path: 'index', component: ListSuggestionsComponent },
  { path: 'create', component: CreateQuestionComponent },
  { path: 'create-response/:questionId', component: CreateResponseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatBotRoutingModule { }
