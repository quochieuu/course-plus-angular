import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  id!: any;
  item!: any;
  blogTitle!: string;
  topBlogs: any = [];
  blogs: any = [];

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
    this.getBooks();
  }

  getData():void {
    this.blogService.find(this.id).subscribe(
      (data) => {
        this.item = data;
        this.blogTitle = this.item.title;
        this.titleService.setTitle(this.blogTitle + " - Course Plus");
      },
      (error) => console.log(error)
    );
  }

  getBooks() {
    this.blogService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.topBlogs = data.slice(0, 7);
        this.blogs = data;
      });
  }

}
