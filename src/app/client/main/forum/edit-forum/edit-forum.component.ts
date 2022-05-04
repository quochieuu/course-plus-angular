import { ForumService } from './../../../../shared/services/forum.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Forum } from './../../../../shared/models/forum';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-forum',
  templateUrl: './edit-forum.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit-forum.component.scss']
})
export class EditForumComponent implements OnInit {

  id!: string;
  item!: Forum;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.forumService.getForumById(this.id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '350px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  onSubmit() {
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
        text: 'Xác nhận chỉnh sửa forum?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.forumService.updateForum(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('/forum/my-questions')
              );
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Cập nhật thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
