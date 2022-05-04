import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../models/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
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

  getAll(): Observable<Banner[]> {
    return this.httpClient
        .get<Banner[]>(this.apiURL + '/api/sysbanner/get-all', this.httpOptions)
        .pipe();
  }

  create(item: any): Observable<Banner> {
    return this.httpClient
        .post<Banner>(this.apiURL + '/api/sysbanner/create', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  createImage(id: string, item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/sysbanner/create-image/' + id, item, {
            headers: new HttpHeaders({
                // 'Authorization': `Bearer ${this.currentUser.token}`
            })})
        .pipe();
  }

  delete(id: string) {
    return this.httpClient
        .delete<Banner>(this.apiURL + '/api/sysbanner/delete/' + id, this.httpOptions)
  }

}
