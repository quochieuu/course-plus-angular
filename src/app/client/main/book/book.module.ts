import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ListBooksComponent } from './list-books/list-books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookReadComponent } from './book-read/book-read.component';


@NgModule({
  declarations: [
    ListBooksComponent,
    BookDetailComponent,
    BookReadComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
