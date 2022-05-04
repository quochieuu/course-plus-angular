import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      };
  }

  checkServerReponse(): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/health-check/server-response', this.httpOptions)
        .pipe();
  }

  checkAuthorize(): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/health-check/auth-authorized', {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }
}
