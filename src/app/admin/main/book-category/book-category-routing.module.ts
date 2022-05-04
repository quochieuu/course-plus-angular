import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'blog-category', redirectTo: 'book-category/index', pathMatch: 'full'},
  	{ path: 'index', component: IndexComponent },
  	{ path: 'create', component: CreateComponent },
  	{ path: 'update/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule { }
