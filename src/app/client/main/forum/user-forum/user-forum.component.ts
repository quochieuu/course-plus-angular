import { AccountService } from './../../../../shared/services/account.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from './../../../../shared/services/forum.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Forum } from 'src/app/shared/models/forum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-forum',
  templateUrl: './user-forum.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './user-forum.component.scss']
})
export class UserForumComponent implements OnInit {

  questions: Forum[] = [];
  topicSlug!: string;
  currentUser!: any;

  constructor(
    public forumService: ForumService,
    public accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,) {
    }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        console.log(data);
        this.currentUser = data;
        this.getForumsOfUser(this.currentUser.userId);
      });
  }

  getForumsOfUser(userId: string) {
    this.forumService
      .getForumsOfUser(userId)
      .subscribe((data: any) => {
        console.log(data);
        this.questions = data;
      });
  }

  deleteForum(id: string): void {
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
        text: 'Xác nhận xóa câu hỏi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.forumService.deleteForum(id).subscribe((res) => {
            this.questions = this.questions.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getForumsOfUser(this.currentUser.userId);
          this.getForumsOfUser(this.currentUser.userId);
          this.getForumsOfUser(this.currentUser.userId);
          this.getForumsOfUser(this.currentUser.userId);
          this.getForumsOfUser(this.currentUser.userId);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
