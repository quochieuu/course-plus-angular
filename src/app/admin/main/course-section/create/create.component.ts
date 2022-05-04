import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseSectionService } from '../../../../shared/services/course-section.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm!: FormGroup;
  courseId!: string;
  course: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private courseSectionService: CourseSectionService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.getCourse(this.courseId);
    this.createForm = this.formBuilder.group({
      courseId: this.courseId,
      name: [''],
      description: [''],
    });
  }

  getCourse(id: string): void {
    this.courseSectionService.findCourseById(id).subscribe(
      (data) => {
        this.course = data;
        console.log(this.course.slug)
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
        text: 'Xác nhận thêm mới section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.courseSectionService.create(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course-section/' + this.course.slug)
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
