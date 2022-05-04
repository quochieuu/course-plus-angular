import { ForumTopic } from './../../../../shared/models/forum-topic';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from './../../../../shared/services/forum.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-forum-topics',
  templateUrl: './forum-topics.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './forum-topics.component.scss']
})
export class ForumTopicsComponent implements OnInit {
  topics: ForumTopic[] = [];

  constructor( public forumService: ForumService,

    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.forumService
      .getAllTopics()
      .subscribe((data: any) => {
        console.log(data);
        this.topics = data;
      });
  }

}
