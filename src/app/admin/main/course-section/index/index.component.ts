import { CourseLecture } from './../../../../shared/models/course-lecture';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseSection } from 'src/app/shared/models/course-section';
import Swal from 'sweetalert2';
import { CourseSectionService } from '../../../../shared/services/course-section.service';
import { CourseLectureService } from 'src/app/shared/services/course-lecture.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {

  item: CourseSection[] = [];
  secItem: CourseSection | any;

  course: Course | any;
  courseSection: CourseSection | any;
  courseLecture: CourseLecture | any;
  slug!: string;
  data!: {};
  secData!: {};

  showTab = 0;
  isHide = 0;
  createSecSubmitted = false;

  createForm!: FormGroup;
  updateSectionForm!: FormGroup;
  courseId!: string;

  closeResult: string | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private courseSectionService: CourseSectionService,
    private titleService: Title,
    private courseLectureService: CourseLectureService)
    {
      this.titleService.setTitle("Quản lý chương trình giảng dạy - Course Plus Admin");
    }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getData(this.slug);
    this.getCourse(this.slug);

    this.createForm = this.formBuilder.group({
      courseId: [''],
      name: ['', [Validators.required, Validators.minLength(10)]],
      description: [''],
    });

    this.updateSectionForm = this.formBuilder.group({
      courseId: [''],
      name: [''],
      description: [''],
    });

  }


  get f(){
    return this.createForm.controls;
  }

  getData(slug:string):void {
    this.courseSectionService.getByCourseSlug(slug).subscribe(
      (data) => {
        this.item = data;
        console.log(this.item);
      },
      (error) => console.log(error)
    );
  }

  getCourse(slug: string): void {
    this.courseSectionService.findCourseBySlug(slug).subscribe(
      (data) => {
        this.course = data;
        this.courseId = data.id;
      },
      (error) => console.log(error)
    );
  }

  delete(id: string): void {
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
        text: 'Xác nhận xóa section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseSectionService.delete(id).subscribe((res) => {
            this.courseSection = this.courseSection.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          for (let i = 0; i < 4; i++) {
            this.getData(this.slug);
          }

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  onSubmit(): any {
    this.createSecSubmitted = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });
    if(this.f.name.errors == null) {
    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận thêm mới section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(this.createForm.value.name);
          this.data = {
            'courseId' : this.courseId,
            'name' : this.createForm.value.name,
            'description': this.createForm.value.description
          }
          this.courseSectionService.create(this.data).subscribe(
            () => {
              this.createForm.reset();
              for (let i = 0; i < 2; i++) {
                this.getData(this.slug);
              }
              this.tabCancel();

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

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
  }

  deleteLecture(id: string): void {
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
        text: 'Xác nhận xóa bài học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseLectureService.delete(id).subscribe((res) => {
            this.courseLecture = this.courseLecture.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          for (let i = 0; i < 4; i++) {
            this.getData(this.slug);
          }

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  onSubmitUpdateSection(id: string) {
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
        text: 'Xác nhận chỉnh sửa section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.secData = {
            'courseId' : this.courseId,
            'name' : this.updateSectionForm.value.name,
            'description': this.updateSectionForm.value.description
          }
          this.courseSectionService.update(id, this.secData).subscribe(
            () => {
              for (let i = 0; i < 4; i++) {
                this.getData(this.slug);
              }
              this.tabCancel();
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
