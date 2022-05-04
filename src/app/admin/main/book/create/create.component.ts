import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BookCategoryService } from 'src/app/shared/services/book-category.service';
import { BookService } from 'src/app/shared/services/book.service';
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
  bookCategories: any;

  selectedFile: File | undefined;
  imageSrc: string | undefined;
  isImageChange: boolean | undefined;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private bookService: BookService,
    private bookCategoryService: BookCategoryService,
  ) {
    this.createForm = this.formBuilder.group({
      name: [''],
      description: [''],
      content: [''],
      bookCategoryId: [''],
      author: [''],
      urlImage: [''],
      urlBook: [''],
      pageCount: [''],
      wordCount: [''],
      language: [''],
      price: [''],
      originalPrice: [''],
      priceUnit: [''],
      startDate: [''],
      endDate: [''],
    });

    this.isImageChange = false;
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '700px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

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

  langs = [
    'Tiếng Việt',
    'English',
    'Japanese',
    'Khác'
  ];

  ngOnInit(): void {
    this.getCategories();
  }

  get f(){
    return this.myForm.controls;
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
        text: 'Xác nhận thêm mới sách?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.bookService.create(this.createForm.value).subscribe(
            (res) => {
              this.submitCreateImage(res.id)
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

  getCategories(): void {
    this.bookCategoryService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.bookCategories = data;
      });
  }

  submitCreateImage(id: string) {
    var formData = new FormData();
    formData.append( "file", this.selectedFile!);

    this.bookService.createImage(id, formData).subscribe(res => {
      console.log(res)

      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/book/index')
      );
    }, (err) => {
      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/book/index')
      );
    });
  }

}
