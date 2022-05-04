import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRoutingModule } from './meeting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MeetingHomeComponent } from './meeting-home/meeting-home.component';

@NgModule({
  declarations: [
    MeetingHomeComponent,
    MeetingRoomComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MeetingModule { }
