import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './filter-courses.component.scss']
})
export class FilterCoursesComponent implements OnInit {

  private apiURL = environment.apiUrl;
  courses: any = [];
  categories: any = [];
  totalItems: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';
  baseUrl: string = this.apiURL;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public courseService: CourseService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Tìm kiếm khoá học - Course Plus");
  }

  ngOnInit(): void {
    this.getPage(this.p, this.pageSize, this.query);
    this.getCategories();
  }

  handlePageChange(event: number): void {
    this.p = event;
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getPage(this.p, event.target.value, this.query);
    this.handlePageChange(this.p);
  }

  handleSearch(ev: any) {
    this.query = ev.target.value;
    this.getPage(this.p, this.pageSize, ev.target.value);
  }

  getPage(p: number, pageSize: number, query: string) {
    this.courseService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.courses = data.items;
        this.totalItems = data.totalRecords;
      });
  }

  getCategories() {
    this.courseService
      .getCategories()
      .subscribe((data: any) => {
        console.log(data);
        this.categories = data;
      });
  }

}
