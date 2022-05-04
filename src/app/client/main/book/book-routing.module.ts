import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookReadComponent } from './book-read/book-read.component';
import { ListBooksComponent } from './list-books/list-books.component';

const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ListBooksComponent },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: 'read', component: BookReadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
