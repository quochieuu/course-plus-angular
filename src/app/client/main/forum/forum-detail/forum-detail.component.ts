import { ToastService } from 'angular-toastify';
import { AccountService } from './../../../../shared/services/account.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Forum } from './../../../../shared/models/forum';
import { ForumService } from './../../../../shared/services/forum.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForumAnswer } from 'src/app/shared/models/forum-answer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  topicSlug!: string;
  question!: Forum;
  answers: ForumAnswer[] = [];

  createForm: FormGroup;

  isLogin = false;
  user!: any;

  constructor(private route: ActivatedRoute,
    public forumService: ForumService,
    public accountService: AccountService,
    private _toastService: ToastService,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,) {
      this.topicSlug = this.route.snapshot.params['slug'];

      this.createForm = this.formBuilder.group({
        content: [''],
        forumId: [''],
      });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    placeholder: 'Nhập phản hồi của bạn...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  ngOnInit() {
    this.getUser();
    this.getForum(this.topicSlug);
  }

  getForum(slug: string) {
    this.forumService
      .getForumBySlug(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.question = data;
        this.getAnswers(data.id);
      });
  }

  getUser() {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        console.log(data);
        this.isLogin = true;
        this.user = data;
      }, (err: any) => {
        this.isLogin = false;
      });
  }

  getAnswers(id: string) {
    this.forumService
      .getAnswerOfTopic(id)
      .subscribe((data: any) => {
        console.log(data);
        this.answers = data;
      });
  }

  onSubmit(): any {
    this.forumService.createAnswer(this.createForm.value).subscribe(
      () => {
        this.addInfoToast("Thêm phản hồi thành công")
        this.getForum(this.topicSlug);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addInfoToast(message: string) {
    this._toastService.info(message);
  }

  deleteAnswer(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa phản hồi của bạn?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getForum(this.topicSlug);

          this.forumService.deleteAnswer(id).subscribe((res) => {
            this.answers = this.answers.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getForum(this.topicSlug);
          this.getForum(this.topicSlug);
          this.getForum(this.topicSlug);
          this.getForum(this.topicSlug);
          this.getForum(this.topicSlug);
          this.getForum(this.topicSlug);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }



}
