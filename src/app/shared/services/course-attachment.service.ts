import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseLectureAttachment } from 'src/app/shared/models/course-attachment';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseAttachmentService {
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

  getLecture(id: string): Observable<CourseLecture> {
    return this.httpClient
        .get<CourseLecture>(this.apiURL + '/api/course-lecture/get-by-id/' + id, this.httpOptions)
  }

  findByLecture(id: string): Observable<CourseLectureAttachment[]> {
    return this.httpClient
        .get<CourseLectureAttachment[]>(this.apiURL + '/api/course-lecture-attachment/lecture/' + id, this.httpOptions)
  }

create(item: any): Observable<CourseLectureAttachment> {
    return this.httpClient
        .post<CourseLectureAttachment>(this.apiURL + '/api/course-lecture-attachment/create', item)
        .pipe();
}

find(id: string): Observable<CourseLectureAttachment> {
  return this.httpClient
        .get<CourseLectureAttachment>(this.apiURL + '/api/course-lecture-attachment/get-by-id/' + id, this.httpOptions)
}

delete(id: string) {
    return this.httpClient
        .delete<CourseLectureAttachment>(this.apiURL + '/api/course-lecture-attachment/delete/' + id, this.httpOptions)
}
}
