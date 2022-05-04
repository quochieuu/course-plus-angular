import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    this.httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.accessToken}`
        })
    };
  }

  getAllForums(): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-all', this.httpOptions)
        .pipe();
  }

  getAllTopics(): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/topics/get-all', this.httpOptions)
        .pipe();
  }

  getAllAnswers(): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/answers/get-all', this.httpOptions)
        .pipe();
  }

  getForumsPaging(page: number, size: number, query: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
        .pipe();
  }

  getTopicsPaging(page: number, size: number, query: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/topics/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
        .pipe();
  }

  getForumsOfTopic(slug: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/topic/get-forums/' + slug, this.httpOptions)
        .pipe();
  }

  getForumsOfUser(userId: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/user/get-forums/' + userId, this.httpOptions)
        .pipe();
  }

  getAnswerOfTopic(id: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-answers/' + id, this.httpOptions)
        .pipe();
  }

  getForumById(id: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-forum-by-id/' + id, this.httpOptions)
        .pipe();
  }

  getTopicById(id: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-topic-by-id/' + id, this.httpOptions)
        .pipe();
  }

  getAnswerById(id: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-answer-by-id/' + id, this.httpOptions)
        .pipe();
  }

  getForumBySlug(slug: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-forum-by-slug/' + slug, this.httpOptions)
        .pipe();
  }

  getTopicBySlug(slug: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/forum/get-topic-by-slug/' + slug, this.httpOptions)
        .pipe();
  }

  createForum(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/forum/create-forum', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  createTopic(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/forum/create-topic', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  createAnswer(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/forum/create-answer', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  updateForum(id: string, item: any): Observable<any> {
    return this.httpClient
        .put<any>(this.apiURL + '/api/forum/update-forum/' + id, JSON.stringify(item), this.httpOptions)
  }

  updateTopic(id: string, item: any): Observable<any> {
    return this.httpClient
        .put<any>(this.apiURL + '/api/forum/update-forum-topic/' + id, JSON.stringify(item), this.httpOptions)
  }

  updateAnswer(id: string, item: any): Observable<any> {
    return this.httpClient
        .put<any>(this.apiURL + '/api/forum/update-forum-answer/' + id, JSON.stringify(item), this.httpOptions)
  }

  deleteForum(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/forum/delete-forum/' + id, this.httpOptions)
  }

  deleteTopic(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/forum/delete-topic/' + id, this.httpOptions)
  }

  deleteAnswer(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/forum/delete-answer/' + id, this.httpOptions)
  }

}
