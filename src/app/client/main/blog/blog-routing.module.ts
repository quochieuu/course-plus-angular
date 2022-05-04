import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';

const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ListBlogsComponent },
  { path: 'detail/:id', component: BlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
