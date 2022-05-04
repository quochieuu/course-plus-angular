import { Wishlist } from './../models/wishlist';
import { Course } from './../models/course';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

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

  create(id: string): Observable<any[]> {
      return this.httpClient
          .get<any[]>(this.apiURL + '/api/wishlist/create/' + id, this.httpOptions)
          .pipe();
  }

  delete(id: string): Observable<any[]> {
    return this.httpClient
        .delete<any[]>(this.apiURL + '/api/wishlist/delete/' + id, this.httpOptions)
        .pipe();
  }

  getAll(): Observable<Wishlist[]> {
    return this.httpClient
        .get<Wishlist[]>(this.apiURL + '/api/wishlist/get-all', this.httpOptions)
        .pipe();
  }

}
