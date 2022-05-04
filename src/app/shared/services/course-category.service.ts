import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseCategory } from 'src/app/shared/models/course-category';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {
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

    getAll(): Observable<CourseCategory[]> {
        return this.httpClient
            .get<CourseCategory[]>(this.apiURL + '/api/course-category/get-all', this.httpOptions)
            .pipe();
    }

    getPage(page: number, size: number, query: string): Observable<CourseCategory[]> {
        return this.httpClient
            .get<CourseCategory[]>(this.apiURL + '/api/course-category/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
            .pipe();
    }

    create(item: any): Observable<CourseCategory> {
        return this.httpClient
            .post<CourseCategory>(this.apiURL + '/api/course-category/create', JSON.stringify(item), this.httpOptions)
            .pipe();
    }

    find(id: string): Observable<CourseCategory> {
        return this.httpClient
            .get<CourseCategory>(this.apiURL + '/api/course-category/get-by-id/' + id, this.httpOptions)
    }

    update(id: string, item: any): Observable<CourseCategory> {
        return this.httpClient
            .put<CourseCategory>(this.apiURL + '/api/course-category/update/' + id, JSON.stringify(item), this.httpOptions)
    }

    delete(id: string) {
        return this.httpClient
            .delete<CourseCategory>(this.apiURL + '/api/course-category/delete/' + id, this.httpOptions)
    }

}
