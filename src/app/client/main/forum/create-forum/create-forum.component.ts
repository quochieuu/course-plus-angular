import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ForumTopic } from './../../../../shared/models/forum-topic';
import Swal from 'sweetalert2';
import { ForumService } from './../../../../shared/services/forum.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {
  createForm: FormGroup;
  topics: ForumTopic[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private forumService: ForumService
  ) {
    this.createForm = this.formBuilder.group({
      name: [''],
      content: [''],
      topicId: [''],
    });
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


  ngOnInit(): void {
    this.getAllTopics();
  }

  getAllTopics() {
    this.forumService
      .getAllTopics()
      .subscribe((data: any) => {
        console.log(data);
        this.topics = data;
      });
  }

  onSubmit(): any {
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
        text: 'Xác nhận thêm mới câu hỏi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.forumService.createForum(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('/forum/topics')
              );
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Thêm mới thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
