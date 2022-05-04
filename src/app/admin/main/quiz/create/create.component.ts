import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Title } from '@angular/platform-browser';
import { CourseService } from './../../../../shared/services/course.service';
import Swal from 'sweetalert2';
import { QuizService } from './../../../../shared/services/quiz.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  courses!: any;

  createForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private quizService: QuizService,
    private courseService: CourseService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Thêm mới bài trắc nghiệm - Course Plus Admin");

    this.createForm = this.formBuilder.group({
      courseId: null,
      title: [''],
      description: [''],
      content: [''],
      level: 0,
      duration: ['1'],
      type: 0,
      score: 100,
      attempt: 3,
      startDate: [''],
      endDate: [''],
    });
  }

  levels = [
    {
      'value': 0,
      'name': 'Dễ'
    },
    {
      'value': 1,
      'name': 'Bình Thường'
    },
    {
      'value': 2,
      'name': 'Khó'
    }
  ]

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '350px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung bài trắc nghiệm...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.courses = data;
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
        text: 'Xác nhận thêm mới trắc nghiệm?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.quizService.createQuiz(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/quiz/index')
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
