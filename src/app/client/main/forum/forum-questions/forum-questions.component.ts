import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from './../../../../shared/services/forum.service';
import { Forum } from './../../../../shared/models/forum';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-forum-questions',
  templateUrl: './forum-questions.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './forum-questions.component.scss']
})
export class ForumQuestionsComponent implements OnInit {

  questions: Forum[] = [];
  topicSlug!: string;

  constructor(
    public forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,) {
      this.topicSlug = this.route.snapshot.params['slug'];
    }

  ngOnInit() {
    this.getForum(this.topicSlug);
  }

  getForum(slug: string) {
    this.forumService
      .getForumsOfTopic(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.questions = data;
      });
  }

}
