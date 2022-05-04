import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  books: any = [];
  topBooks: any = [];

  constructor(
    public bookService: BookService,
    private titleService: Title
    ) {
      this.titleService.setTitle("Danh sách sách - Course Plus");
     }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.books = data;
        this.topBooks = data.slice(0, 3);
      });
  }

}
