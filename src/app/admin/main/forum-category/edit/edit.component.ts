import Swal from 'sweetalert2';
import { ForumService } from './../../../../shared/services/forum.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForumTopic } from './../../../../shared/models/forum-topic';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: string;
  item!: ForumTopic;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.forumService.getTopicById(this.id).subscribe(
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

          this.forumService.updateTopic(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/forum-category/index')
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
