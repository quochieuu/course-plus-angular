import { CourseService } from './../../../../client/main/course/course.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { CourseLectureService } from '../../../../shared/services/course-lecture.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm!: FormGroup;
  sectionId!: string;
  courseSlug!: string;
  section: any;

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
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private courseLectureService: CourseLectureService,
    public courseService: CourseService,
  ) { }


  ngOnInit(): void {
    this.sectionId = this.route.snapshot.params['id'];
    this.getSection(this.sectionId)



    this.createForm = this.formBuilder.group({
      sectionId: this.sectionId,
      name: [''],
      content: [''],
      duration: ['00:00:00'],
      urlPreview: [''],
      urlYoutubePreview: [''],
      urlVideo: [''],
      urlYoutubeVideo: [''],
      lectureType: 0,
    });
  }

  getSection(id: string): void {
    this.courseLectureService.getSection(id).subscribe(
      (data) => {
        this.section = data;
        this.getCourse(this.section.courseId);
        console.log(data)
      },
      (error) => console.log(error)
    );
  }

  getCourse(id: string): void {
    this.courseService.find(id).subscribe(
      (data) => {
        this.courseSlug = data.slug;
        console.log(data)
      },
      (error) => console.log(error)
    );
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
        text: 'Xác nhận thêm mới bài học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.courseLectureService.create(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course-section/' + this.courseSlug)
              );
            },
            (err:any) => {
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
