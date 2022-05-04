import { BannerService } from './../../../../shared/services/banner.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {

  createForm: FormGroup;

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
    private bannerService: BannerService
  ) {
    this.createForm = this.formBuilder.group({
      title: [''],
      description: [''],
      buttonName: [''],
      link: [''],
      urlImage: [''],
      sortOrder: 0
    });

    this.isImageChange = false;
  }

  ngOnInit(): void {

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
        text: 'Xác nhận thêm mới banner?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.bannerService.create(this.createForm.value).subscribe(
            (res) => {
              // this.ngZone.run(() =>
              //   this.router.navigateByUrl('admin/systems/index')
              // );
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

  submitCreateImage(id: string) {
    var formData = new FormData();
    formData.append( "file", this.selectedFile!);

    this.bannerService.createImage(id, formData).subscribe(res => {
      console.log(res)

      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/systems/index')
      );
    }, (err) => {
      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/systems/index')
      );
    });
  }

}
