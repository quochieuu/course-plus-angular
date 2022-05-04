import { BlogService } from 'src/app/shared/services/blog.service';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from './../../../../environments/environment';
import { CourseService } from './../course/course.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BannerService } from 'src/app/shared/services/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: any = [];
  books: any = [];
  blogs: any = [];
  banners: any = [];
  featureCourses: any = [];

  loadingCourse = false;
  loadingBook = false;
  loadingNews = false;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
      public courseService: CourseService,
      public bookService: BookService,
      public blogService: BlogService,
      private titleService: Title,
      public bannerService: BannerService
    ) {

    }

  ngOnInit(): void {
    this.titleService.setTitle("Course Plus - Học lập trình để đi làm qua các dự án thực tế 2022");

    this.getCourses();
    this.getBooks();
    this.getBlogs();
    this.getBanners();
  }

  getCourses() {
    this.loadingCourse = true;
    this.courseService
      .getAll()
      .subscribe((data: any) => {
        this.loadingCourse = false;
        console.log(data);
        console.log(this.loadingCourse);
        this.courses = data;
        this.featureCourses = data.slice(0, 3);
      },
      (err: any) => {
        this.loadingCourse = true;
        console.log(this.loadingCourse);
      });
  }

  getBooks() {
    this.loadingBook = true;
    this.bookService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.books = data;
        this.loadingBook = false;
      },
      (err: any) => {
        this.loadingBook = true;
      });
  }

  getBlogs() {
    this.loadingNews = true;
    this.blogService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.blogs = data;
        this.loadingNews = false;
      },
      (err: any) => {
        this.loadingNews = true;
      });
  }

  getBanners() {
    this.bannerService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.banners = data;
      });
  }

}
