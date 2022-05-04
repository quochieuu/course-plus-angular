import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ListSuggestionsComponent } from './list-suggestions/list-suggestions.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateResponseComponent } from './create-response/create-response.component';


@NgModule({
  declarations: [
    ListSuggestionsComponent,
    CreateQuestionComponent,
    CreateResponseComponent
  ],
  imports: [
    CommonModule,
    ChatBotRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ChatBotModule { }
