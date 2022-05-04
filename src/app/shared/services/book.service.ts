import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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

  getAll(): Observable<Book[]> {
      return this.httpClient
          .get<Book[]>(this.apiURL + '/api/book/get-all', this.httpOptions)
          .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<Book[]> {
      return this.httpClient
          .get<Book[]>(this.apiURL + '/api/book/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  create(item: any): Observable<Book> {
      return this.httpClient
          .post<Book>(this.apiURL + '/api/book/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  createImage(id: string, item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/book/create-image/' + id, item, {
            headers: new HttpHeaders({
                // 'Authorization': `Bearer ${this.currentUser.token}`
            })})
        .pipe();
  }

  find(id: string): Observable<Book> {
      return this.httpClient
          .get<Book>(this.apiURL + '/api/book/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<Book> {
      return this.httpClient
          .put<Book>(this.apiURL + '/api/book/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  increaseDownloadCount(id: string, item: any): Observable<Book> {
    return this.httpClient
        .put<Book>(this.apiURL + '/api/book/update-download-count/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<Book>(this.apiURL + '/api/book/delete/' + id, this.httpOptions)
  }
}
