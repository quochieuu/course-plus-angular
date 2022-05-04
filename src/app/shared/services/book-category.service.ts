import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCategory } from 'src/app/shared/models/book-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${this.currentUser.token}`
          })
      };
  }

  getAll(): Observable<BookCategory[]> {
      return this.httpClient
          .get<BookCategory[]>(this.apiURL + '/api/book-category/get-all', this.httpOptions)
          .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<BookCategory[]> {
      return this.httpClient
          .get<BookCategory[]>(this.apiURL + '/api/book-category/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  create(item: any): Observable<BookCategory> {
      return this.httpClient
          .post<BookCategory>(this.apiURL + '/api/book-category/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  find(id: string): Observable<BookCategory> {
      return this.httpClient
          .get<BookCategory>(this.apiURL + '/api/book-category/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<BookCategory> {
      return this.httpClient
          .put<BookCategory>(this.apiURL + '/api/book-category/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<BookCategory>(this.apiURL + '/api/book-category/delete/' + id, this.httpOptions)
  }
}
