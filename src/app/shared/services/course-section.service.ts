import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course';
import { CourseSection } from 'src/app/shared/models/course-section';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {

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

  getByCourseSlug(slug: string): Observable<CourseSection[]> {
    return this.httpClient
        .get<CourseSection[]>(this.apiURL + '/api/course-section/course/'+ slug, this.httpOptions)
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

create(item: any): Observable<CourseSection> {
    return this.httpClient
        .post<CourseSection>(this.apiURL + '/api/course-section/create', JSON.stringify(item), this.httpOptions)
        .pipe();
}

find(id: string): Observable<CourseSection> {
  return this.httpClient
        .get<CourseSection>(this.apiURL + '/api/course-section/get-by-id/' + id, this.httpOptions)
}

update(id: string, item: any): Observable<CourseSection> {
    return this.httpClient
        .put<CourseSection>(this.apiURL + '/api/course-section/update/' + id, JSON.stringify(item), this.httpOptions)
}

delete(id: string) {
    return this.httpClient
        .delete<Course>(this.apiURL + '/api/course-section/delete/' + id, this.httpOptions)
}

}
