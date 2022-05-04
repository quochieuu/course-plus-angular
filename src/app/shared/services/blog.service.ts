import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from 'src/app/shared/models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

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

  getAll(): Observable<Blog[]> {
      return this.httpClient
          .get<Blog[]>(this.apiURL + '/api/blog/get-all', this.httpOptions)
          .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<Blog[]> {
      return this.httpClient
          .get<Blog[]>(this.apiURL + '/api/blog/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  create(item: any): Observable<Blog> {
      return this.httpClient
          .post<Blog>(this.apiURL + '/api/blog/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  createImage(id: string, item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/blog/create-image/' + id, item, {
            headers: new HttpHeaders({
                // 'Authorization': `Bearer ${this.currentUser.token}`
            })})
        .pipe();
  }

  find(id: string): Observable<Blog> {
      return this.httpClient
          .get<Blog>(this.apiURL + '/api/blog/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<Blog> {
      return this.httpClient
          .put<Blog>(this.apiURL + '/api/blog/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<Blog>(this.apiURL + '/api/blog/delete/' + id, this.httpOptions)
  }
}
