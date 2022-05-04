import { Course } from './../models/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/shared/models/login';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiURL = environment.apiUrl;
  currentUser: any;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
   }

  login(data: any): Observable<UserLogin> {
    return this.httpClient.post<UserLogin>(this.apiURL + '/api/auth/login', JSON.stringify(data), this.httpOptions).pipe();
  }

  register(data: any): Observable<UserRegister> {
    return this.httpClient
      .post<UserRegister>(this.apiURL + '/api/auth/register', JSON.stringify(data), this.httpOptions).pipe();
  }

  getCurrentUser(): Observable<any> {

    return this.httpClient
      .get<any>(this.apiURL + '/api/auth/profile', {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.accessToken}`
        })
    }).pipe();
  }

  getProvinces() {
    return this.httpClient
      .get<any>('https://provinces.open-api.vn/api/?depth=1').pipe();
  }

  signOut(): void {
      window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(environment.TOKEN_KEY);
    window.sessionStorage.setItem(environment.TOKEN_KEY, token);
  }

  public getToken(): string {
      return sessionStorage.getItem(environment.TOKEN_KEY) || '';
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(environment.USER_KEY);
    window.sessionStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(environment.USER_KEY) || '');
  }

  updateAvatar(data: any): Observable<any[]> {
    return this.httpClient
        .post<any[]>(this.apiURL + '/api/auth/update-avatar/', data, {
          headers: new HttpHeaders({
              // 'Content-Type': 'application/json'
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }

  listCourses(): Observable<Course[]> {
    return this.httpClient
        .get<Course[]>(this.apiURL + '/api/auth/list-courses', {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }

  updateInfor(data: any): Observable<any[]> {
    return this.httpClient
        .post<any[]>(this.apiURL + '/api/auth/update-information/', JSON.stringify(data), {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }

  requestChangePassword(): Observable<any[]> {
    return this.httpClient
        .post<any[]>(this.apiURL + '/api/auth/change-password', {}, {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      }).pipe();
  }

  resetPassword(data: any): Observable<any[]> {
    return this.httpClient
        .post<any[]>(this.apiURL + '/api/auth/reset-password', JSON.stringify(data), {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      }).pipe();
  }

}
