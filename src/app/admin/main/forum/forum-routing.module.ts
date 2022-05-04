import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListForumComponent } from './list-forum/list-forum.component';

const routes: Routes = [
  { path: 'forum', redirectTo: 'forum/index', pathMatch: 'full'},
  	{ path: 'index', component: ListForumComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
