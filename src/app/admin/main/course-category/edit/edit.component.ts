import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/models/course-category';
import Swal from 'sweetalert2';
import { CourseCategoryService } from '../../../../shared/services/course-category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss',
  ],
})
export class EditComponent implements OnInit {
  id!: string;
  item!: CourseCategory;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseCategoryService: CourseCategoryService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.courseCategoryService.find(this.id).subscribe(
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
        text: 'Xác nhận chỉnh sửa danh mục?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.courseCategoryService.update(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course-category/index')
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
