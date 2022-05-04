import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogService } from 'src/app/shared/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-blogs.component.scss']
})
export class ListBlogsComponent implements OnInit {

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  blogs: any = [];
  topBlogs: any = [];

  constructor(
    public blogService: BlogService,
    private titleService: Title
    ) {
      this.titleService.setTitle("Tin tức mới nhất - Course Plus");
     }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.blogs = data;
        this.topBlogs = data.slice(0, 4);
      });
  }

}
