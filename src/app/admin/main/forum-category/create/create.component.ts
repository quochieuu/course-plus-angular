import { ForumService } from './../../../../shared/services/forum.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private forumService: ForumService
  ) {
    this.createForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

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
        text: 'Xác nhận thêm mới danh mục?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.forumService.createTopic(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/forum-category/index')
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
