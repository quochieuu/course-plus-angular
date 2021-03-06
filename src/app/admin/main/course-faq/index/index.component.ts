import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseFaq } from 'src/app/shared/models/course-faq';
import Swal from 'sweetalert2';
import { CourseFaqService } from '../../../../shared/services/course-faq.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {
  item: CourseFaq[] = [];
  course: Course | any;
  coursesFaq: CourseFaq | any;
  slug!: string;
  courseId!: string;
  courseFaqData!: {};
  updateFaqData!: {};

  showTab = 0;
  isHide = 0;

  createForm!: FormGroup;
  updateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseFaqService: CourseFaqService,
    public formBuilder: FormBuilder,)
    { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getData(this.slug);
    this.getCourse(this.slug);

    this.createForm = this.formBuilder.group({
      courseId: [''],
      title: [''],
      content: [''],
    });

    this.updateForm = this.formBuilder.group({
      courseId: [''],
      title: [''],
      content: [''],
    });
  }

  getData(slug:string):void {
    this.courseFaqService.getByCourseSlug(slug).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  getCourse(slug: string): void {
    this.courseFaqService.findCourseBySlug(slug).subscribe(
      (data) => {
        this.course = data;

        this.courseId = this.course.id;
      },
      (error) => console.log(error)
    );
  }

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
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
        text: 'X??c nh???n x??a c??u h???i?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'X??c nh???n',
        cancelButtonText: 'H???y',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseFaqService.delete(id).subscribe((res) => {
            this.coursesFaq = this.coursesFaq.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getData(this.slug);
          this.getData(this.slug);
          this.getData(this.slug);
          this.getData(this.slug);

          swalWithBootstrapButtons.fire('X??a th??nh c??ng!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('H???y th??nh c??ng!');
        }
      });
  }

  onSubmitNewFaq(): any {
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
        text: 'X??c nh???n th??m m???i c??u h???i?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'X??c nh???n',
        cancelButtonText: 'H???y',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.courseFaqData = {
            'courseId': this.createForm.value.courseId,
            'title': this.createForm.value.title,
            'content': this.createForm.value.content
          }
          this.courseFaqService.create(this.createForm.value).subscribe(
            () => {
              this.getData(this.slug);
              this.getData(this.slug);

              this.createForm.value.title.reset();
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Th??m m???i th??nh c??ng!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('H???y th??nh c??ng!');
        }
      });
  }

  onSubmitUpdateFaq(faqId: string) {
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
        text: 'X??c nh???n ch???nh s???a c??u h???i ????p?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'X??c nh???n',
        cancelButtonText: 'H???y',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.updateFaqData = {
            'courseId': this.updateForm.value.courseId,
            'title': this.updateForm.value.title,
            'content': this.updateForm.value.content
          }

          this.courseFaqService.update(faqId, this.updateFaqData).subscribe(
            () => {
              this.getData(this.slug);
              this.getData(this.slug);
              this.tabCancel();
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('C???p nh???t th??nh c??ng!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('H???y th??nh c??ng!');
        }
      });
  }

}
