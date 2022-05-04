import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingHomeComponent } from './meeting-home/meeting-home.component';

const routes: Routes = [
  { path: 'home', component: MeetingHomeComponent, pathMatch: 'full' },
  { path: ':id', component: MeetingRoomComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
