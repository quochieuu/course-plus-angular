import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategory } from 'src/app/shared/models/blog-category';
import Swal from 'sweetalert2';
import { BlogCategoryService } from '../../../../shared/services/blog-category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss']
})
export class EditComponent implements OnInit {
  id!: string;
  item!: BlogCategory;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogCategoryService: BlogCategoryService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogCategoryService.find(this.id).subscribe(
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
          
          this.blogCategoryService.update(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/blog-category/index')
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
