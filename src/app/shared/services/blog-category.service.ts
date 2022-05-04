import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogCategory } from 'src/app/shared/models/blog-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {
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

  getAll(): Observable<BlogCategory[]> {
      return this.httpClient
          .get<BlogCategory[]>(this.apiURL + '/api/blog-category/get-all', this.httpOptions)
          .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<BlogCategory[]> {
      return this.httpClient
          .get<BlogCategory[]>(this.apiURL + '/api/blog-category/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  create(item: any): Observable<BlogCategory> {
      return this.httpClient
          .post<BlogCategory>(this.apiURL + '/api/blog-category/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  find(id: string): Observable<BlogCategory> {
      return this.httpClient
          .get<BlogCategory>(this.apiURL + '/api/blog-category/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<BlogCategory> {
      return this.httpClient
          .put<BlogCategory>(this.apiURL + '/api/blog-category/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<BlogCategory>(this.apiURL + '/api/blog-category/delete/' + id, this.httpOptions)
  }
}
