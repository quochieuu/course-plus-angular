import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLectureAttachment } from 'src/app/shared/models/course-attachment';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CourseAttachmentService } from '../../../../shared/services/course-attachment.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;
  item: CourseLectureAttachment[] = [];
  lectureData: CourseLecture | any;
  courseLecture: CourseLecture | any;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseAttachmentService: CourseAttachmentService,) 
    { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData(this.id);
    this.getLecture(this.id);
  }

  getData(id:string):void {
    this.courseAttachmentService.findByLecture(id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  getLecture(id: string):void {
    this.courseAttachmentService.getLecture(id).subscribe(
      (data) => {
        this.lectureData = data;
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
        text: 'Xác nhận xóa file?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.id);

          this.courseAttachmentService.delete(id).subscribe((res) => {
            this.item = this.item.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getData(this.id);
          this.getData(this.id);
          this.getData(this.id);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
