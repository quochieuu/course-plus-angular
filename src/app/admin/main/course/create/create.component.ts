import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseCategory } from 'src/app/shared/models/course-category';
import Swal from 'sweetalert2';
import { CourseService } from '../../../../shared/services/course.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  courseCategories: CourseCategory[] = [];
  createForm!: FormGroup;

  selectedFile: File | undefined;
  imageSrc: string | undefined;
  isImageChange: boolean | undefined;

  submitted = false;
  res_id: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '350px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }
  editorConfig2: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    placeholder: 'Nhập thông báo khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  langs = [
    'Tiếng Việt',
    'English',
    'Japanese',
    'Khác'
  ];

  priceUnits = [
    {
      'unit': 'đ',
      'description': 'VND'
    },
    {
      'unit': '$',
      'description': 'USD'
    }
  ]

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private courseService: CourseService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Thêm mới khoá học - Course Plus Admin");

    this.isImageChange = false;
  }

  ngOnInit(): void {
    this.getCategories();

    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(20)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      announcement: [''],
      urlVideoIntro: [''],
      urlYoutubeVideo: [''],
      language: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      originalPrice: [null, Validators.required],
      priceUnit: ['', Validators.required],
      isFeatured: false,
      allowEnrolled: true,
      startDate: ['', Validators.required],
      endDate: [''],
      courseCategoryId: ['', Validators.required],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.createForm.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.isImageChange = true;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  onSubmit(): any {
    console.log(this.f.name.errors);
    console.log(this.createForm.valid);
    this.submitted = true;

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
        text: 'Xác nhận thêm mới khoá học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {

          if (result.isConfirmed) {
            this.courseService.create(this.createForm.value).subscribe(
              (res) => {
                this.submitCreateImage(res.id)
                this.res_id = res.id;
              },
              (err) => {
                console.log(err);
              }
            );
            swalWithBootstrapButtons
            .fire({
              text: 'Thêm mới thành công!',
              showCancelButton: true,
              confirmButtonText: 'Thêm mới section',
              cancelButtonText: 'Về danh sách',
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {

                  this.ngZone.run(() =>
                  this.router.navigateByUrl('admin/course-section/'+this.res_id)
                );
              }else {

                this.ngZone.run(() =>
                this.router.navigateByUrl('admin/course/index')
              );
              }
            })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire('Hủy thành công!');
          }


      });
    }
  }

  getCategories(): void {
    this.courseService
      .getCategories()
      .subscribe((data: any) => {
        console.log(data);
        this.courseCategories = data;
      });
  }

  submitCreateImage(id: string) {
    var formData = new FormData();
    formData.append( "file", this.selectedFile!);

    this.courseService.createImage(id, formData).subscribe(res => {
      console.log(res)

      // this.ngZone.run(() =>
      //   this.router.navigateByUrl('admin/course/index')
      // );
    }, (err) => {
      // this.ngZone.run(() =>
      //   this.router.navigateByUrl('admin/course/index')
      // );
    });
  }

}
