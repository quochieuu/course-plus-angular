import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import Swal from 'sweetalert2';
import { CourseLectureService } from '../../../../shared/services/course-lecture.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: string;
  sectionId!: string;
  slug!: string;
  item!: CourseLecture;

  lectureType = [{
    'type': 1,
    'name': 'Video'
  }, {
    'type': 2,
    'name': 'Text'
  }, {
    'type': 3,
    'name': 'Quiz'
  }]

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '350px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung bài học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['insertVideo','insertHorizontalRule','removeFormat',]
    ]
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseLectureService: CourseLectureService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sectionId = this.route.snapshot.params['sectionId'];
    this.courseLectureService.find(this.id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
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
        text: 'Xác nhận chỉnh sửa bài học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.courseLectureService.update(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course-lecture/' + this.sectionId)
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
