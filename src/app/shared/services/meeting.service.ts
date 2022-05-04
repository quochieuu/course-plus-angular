import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
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

  getAll(): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/meeting/get-all', this.httpOptions)
        .pipe();
  }

  getAllHosted(): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/meeting/get-all-hosted', this.httpOptions)
        .pipe();
  }

  getById(id: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/meeting/get-by-id/' + id, this.httpOptions)
        .pipe();
  }

  getByName(name: string): Observable<any> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/meeting/get-by-name/' + name, this.httpOptions)
        .pipe();
  }

  create(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/meeting/create-room', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<any> {
    return this.httpClient
        .get<any>(this.apiURL + '/api/meeting/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
        .pipe();
  }

  delete(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/meeting/delete/' + id, this.httpOptions)
  }

}
