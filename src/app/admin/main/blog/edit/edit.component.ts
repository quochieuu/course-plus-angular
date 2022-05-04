import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Blog } from 'src/app/shared/models/blog';
import { BlogCategoryService } from 'src/app/shared/services/blog-category.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './edit.component.scss']
})
export class EditComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;
  blogCategories: any;

  id!: string;
  item!: Blog;

  selectedFile: File | undefined;
  imageSrc: string | undefined;
  isImageChange: boolean | undefined;

  closeResult: string | undefined;

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

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private blogCategoryService: BlogCategoryService,
    private ngZone: NgZone,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.getCategories();
    this.getData();

    this.blogService.find(this.id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  getData():void {
    this.blogService.find(this.id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  // Modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  get f(){
    return this.myForm.controls;
  }

  // update image 
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

  submitCreateImage() {
    var formData = new FormData();
    formData.append( "file", this.selectedFile!);

    this.blogService.createImage(this.id, formData).subscribe(res => {
      console.log(res)
      this.getData();
      this.ngZone.run(() =>
      this.router.navigateByUrl('admin/blog/update/'+this.id)
    );
    }, (err) => {
      this.getData();
      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/blog/update/'+this.id)
      );
    });
  }

  getCategories(): void {
    this.blogCategoryService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.blogCategories = data;
      });
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
        text: 'Xác nhận chỉnh sửa tin tức?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.blogService.update(this.id, this.item).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/blog/index')
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
