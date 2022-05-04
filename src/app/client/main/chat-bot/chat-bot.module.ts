import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    ChatBotRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ChatBotModule { }
