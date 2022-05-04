import { UserForumComponent } from './user-forum/user-forum.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumTopicsComponent } from './forum-topics/forum-topics.component';
import { ForumQuestionsComponent } from './forum-questions/forum-questions.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { CreateForumComponent } from './create-forum/create-forum.component';
import { EditForumComponent } from './edit-forum/edit-forum.component';


@NgModule({
  declarations: [
    ForumTopicsComponent,
    ForumQuestionsComponent,
    ForumDetailComponent,
    CreateForumComponent,
    UserForumComponent,
    EditForumComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularEditorModule,
    AngularToastifyModule
  ],
  providers: [ToastService]
})
export class ForumModule { }
