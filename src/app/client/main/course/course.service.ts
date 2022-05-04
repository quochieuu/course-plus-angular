import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course';
import { CourseCategory } from 'src/app/shared/models/course-category';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  httpOptionsAuth: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

      this.httpOptionsAuth = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      };

      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${this.currentUser.token}`
          })
      };
  }

  getCategories(): Observable<CourseCategory[]> {
    return this.httpClient
        .get<CourseCategory[]>(this.apiURL + '/api/course-category/get-all', this.httpOptions)
        .pipe();
}

  getAll(): Observable<Course[]> {
      return this.httpClient
          .get<Course[]>(this.apiURL + '/api/course/get-all', this.httpOptions)
          .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<Course[]> {
      return this.httpClient
          .get<Course[]>(this.apiURL + '/api/course/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  getLecture(id: string): Observable<CourseLecture> {
    return this.httpClient
          .get<CourseLecture>(this.apiURL + '/api/course-lecture/get-by-id/' + id, this.httpOptions)
  }

  create(item: any): Observable<Course> {
      return this.httpClient
          .post<Course>(this.apiURL + '/api/course/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  createImage(id: string, item: any): Observable<any> {
        return this.httpClient
            .post<any>(this.apiURL + '/api/course/create-image/' + id, item, {
                headers: new HttpHeaders({
                    // 'Authorization': `Bearer ${this.currentUser.token}`
                })})
            .pipe();
    }

  find(id: string): Observable<Course> {
      return this.httpClient
          .get<Course>(this.apiURL + '/api/course/get-by-id/' + id, this.httpOptions)
  }

  findBySlug(slug: string): Observable<Course> {
    return this.httpClient
        .get<Course>(this.apiURL + '/api/course/get-by-slug/' + slug, this.httpOptions)
}

  update(id: string, item: any): Observable<Course> {
      return this.httpClient
          .put<Course>(this.apiURL + '/api/course/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<Course>(this.apiURL + '/api/course/delete/' + id, this.httpOptions)
  }

  registerCourse(id: string) {
    return this.httpClient
              .get<any>(this.apiURL + '/api/course/register-course/' + id, this.httpOptionsAuth)
  }

  checkUserInCourse(id: string) {
    return this.httpClient
              .get<any>(this.apiURL + '/api/course/check-user-in-course/' + id, this.httpOptionsAuth)
  }

  listUsersOfCourse(id: string) {
    return this.httpClient
              .get<any>(this.apiURL + '/api/course/list-users-of-course/' + id, this.httpOptionsAuth)
  }

  getFeedbacks(id: string) {
    return this.httpClient
              .get<any>(this.apiURL + '/api/course-feedback/get-by-course/' + id, this.httpOptions)
  }
}
