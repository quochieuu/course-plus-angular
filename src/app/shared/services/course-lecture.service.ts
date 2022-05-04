import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { CourseSection } from 'src/app/shared/models/course-section';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseLectureService {
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

  getBySection(id: string): Observable<CourseLecture[]> {
    return this.httpClient
          .get<CourseLecture[]>(this.apiURL + '/api/course-lecture/section/'+ id, this.httpOptions)
          .pipe();
  }

  getSection(id: string): Observable<CourseSection> {
    return this.httpClient
          .get<CourseSection>(this.apiURL + '/api/course-section/get-by-id/'+ id, this.httpOptions)
          .pipe();
  }

  create(item: any): Observable<CourseLecture> {
      return this.httpClient
          .post<CourseLecture>(this.apiURL + '/api/course-lecture/create', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  find(id: string): Observable<CourseLecture> {
    return this.httpClient
          .get<CourseLecture>(this.apiURL + '/api/course-lecture/get-by-id/' + id, this.httpOptions)
  }

  update(id: string, item: any): Observable<CourseLecture> {
      return this.httpClient
          .put<CourseLecture>(this.apiURL + '/api/course-lecture/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<CourseLecture>(this.apiURL + '/api/course-lecture/delete/' + id, this.httpOptions)
  }
}
