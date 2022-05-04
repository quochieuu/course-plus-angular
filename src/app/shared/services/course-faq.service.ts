import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course';
import { CourseFaq } from 'src/app/shared/models/course-faq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseFaqService {
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

  getByCourseSlug(slug: string): Observable<CourseFaq[]> {
      return this.httpClient
          .get<CourseFaq[]>(this.apiURL + '/api/course-faq/course/'+ slug, this.httpOptions)
          .pipe();
  }

  findCourseBySlug(slug: string): Observable<Course> {
    return this.httpClient
        .get<Course>(this.apiURL + '/api/course/get-by-slug/' + slug, this.httpOptions)
  }

  findCourseById(id: string): Observable<Course> {
    return this.httpClient
        .get<Course>(this.apiURL + '/api/course/get-by-id/' + id, this.httpOptions)
  }

  create(item: any): Observable<CourseFaq> {
      return this.httpClient
          .post<CourseFaq>(this.apiURL + '/api/course-faq/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  find(id: string): Observable<CourseFaq> {
    return this.httpClient
          .get<CourseFaq>(this.apiURL + '/api/course-faq/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<CourseFaq> {
      return this.httpClient
          .put<CourseFaq>(this.apiURL + '/api/course-faq/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<Course>(this.apiURL + '/api/course-faq/delete/' + id, this.httpOptions)
  }
}
