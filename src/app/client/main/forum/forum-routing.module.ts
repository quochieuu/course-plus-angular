import { UserForumComponent } from './user-forum/user-forum.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateForumComponent } from './create-forum/create-forum.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { ForumQuestionsComponent } from './forum-questions/forum-questions.component';
import { ForumTopicsComponent } from './forum-topics/forum-topics.component';
import { EditForumComponent } from './edit-forum/edit-forum.component';

const routes: Routes = [
  { path: 'topics', component: ForumTopicsComponent, pathMatch: 'full' },
  { path: 'create', component: CreateForumComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: EditForumComponent, pathMatch: 'full' },
  { path: 'my-questions', component: UserForumComponent, pathMatch: 'full' },
  { path: ':slug', component: ForumDetailComponent, pathMatch: 'full' },
  { path: 'questions/:slug', component: ForumQuestionsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
