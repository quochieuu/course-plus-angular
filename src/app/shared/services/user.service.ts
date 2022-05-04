import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SysUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getAll(): Observable<SysUser[]> {
    return this.httpClient
        .get<SysUser[]>(this.apiURL + '/api/user/get-all', this.httpOptions)
        .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<SysUser[]> {
      return this.httpClient
          .get<SysUser[]>(this.apiURL + '/api/user/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }


}
