import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  createOrder(data: any): Observable<Order[]> {
    return this.httpClient
        .post<Order[]>(this.apiURL + '/api/order/create-order', JSON.stringify(data), this.httpOptions)
        .pipe();
  }

  getAll(): Observable<Order[]> {
    return this.httpClient
        .get<Order[]>(this.apiURL + '/api/order/get-all', this.httpOptions)
        .pipe();
  }

  cancelOrder(id: string): Observable<Order[]> {
    return this.httpClient
        .put<Order[]>(this.apiURL + '/api/order/cancel-order/' + id, {}, this.httpOptions)
        .pipe();
  }

  deleteOrder(id: string): Observable<Order[]> {
    return this.httpClient
        .delete<Order[]>(this.apiURL + '/api/order/delete-order/' + id, this.httpOptions)
        .pipe();
  }

}
