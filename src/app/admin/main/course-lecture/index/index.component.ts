import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { CourseSection } from 'src/app/shared/models/course-section';
import Swal from 'sweetalert2';
import { CourseLectureService } from '../../../../shared/services/course-lecture.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {
  id!: string;
  item: CourseLecture[] = [];
  section: CourseSection | any;
  courseLecture: CourseLecture | any;
  slug!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseLectureService: CourseLectureService,) 
    { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData(this.id);
    this.getSection(this.id);
  }

  getData(id: string):void {
    this.courseLectureService.getBySection(id).subscribe(
      (data) => {
        this.item = data;
        console.log(data)
      },
      (error) => console.log(error)
    );
  }

  getSection(id: string): void {
    this.courseLectureService.getSection(id).subscribe(
      (data) => {
        this.section = data;
        console.log(data)
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
        text: 'Xác nhận xóa bài học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.id);

          this.courseLectureService.delete(id).subscribe((res) => {
            this.courseLecture = this.courseLecture.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getData(this.id);
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
