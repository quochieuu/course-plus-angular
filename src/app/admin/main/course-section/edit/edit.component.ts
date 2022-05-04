import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseSection } from 'src/app/shared/models/course-section';
import Swal from 'sweetalert2';
import { CourseSectionService } from '../../../../shared/services/course-section.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: string;
  slug!: string;
  item!: CourseSection;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseFaqService: CourseSectionService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.slug = this.route.snapshot.params['slug'];
    this.courseFaqService.find(this.id).subscribe(
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
        text: 'Xác nhận chỉnh sửa section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.courseFaqService.update(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course-section/' + this.slug)
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
