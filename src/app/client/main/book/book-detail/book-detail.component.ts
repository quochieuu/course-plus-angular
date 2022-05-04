import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  id!: any;
  item!: any;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData():void {
    this.bookService.find(this.id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

}
