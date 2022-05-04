import { Title } from '@angular/platform-browser';
import { AccountService } from 'src/app/shared/services/account.service';
import { Component, NgZone, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  requested = false;

  createForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private accountService: AccountService,
    private _toastService: ToastService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Cập nhật mật khẩu - Course Plus");

    this.createForm = this.formBuilder.group({
      code: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {
  }

  requestChangePassword(): void {
    this.addInfoToast("Yêu cầu mã cập nhật mật khẩu thành công! Hãy kiểm tra hộp thư trong email của bạn!");

    this.accountService
      .requestChangePassword()
      .subscribe((data: any) => {
        this.requested = true;
      }, () => {
        this.requested = false;
      });
  }

  resetPassword(data: any): void {
    this.accountService
      .resetPassword(data)
      .subscribe((data: any) => {
      }, () => {
      });
  }

  addInfoToast(message: string) {
    this._toastService.info(message);
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
        text: 'Xác nhận cập nhật mật khẩu?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.accountService
          .resetPassword(this.createForm.value)
          .subscribe((data: any) => {
            this.createForm.reset();
          }, () => {
          });

          swalWithBootstrapButtons.fire('Thêm mới thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
