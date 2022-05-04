import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/shared/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './update-information.component.scss']
})
export class UpdateInformationComponent implements OnInit {
  user: any;
  provinces: any;
  closeResult: string | undefined;

  genders = [
    {
      'name': 'Nam',
      'val': 0,
    },
    {
      'name': 'Nữ',
      'val': 1,
    },
    {
      'name': 'Khác',
      'val': 3,
    }
  ]
  constructor(private accountService: AccountService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private titleService: Title) {
      this.titleService.setTitle("Cập nhật thông tin cá nhân - Course Plus");
    }

  ngOnInit(): void {
    this.getUser();
    this.getProvinces();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user)
      });
  }

  getProvinces(): void {
    this.accountService
      .getProvinces()
      .subscribe((data: any) => {
        this.provinces = data;
      });
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

  // End modal

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
        text: 'Xác nhận cập nhật thông tin cá nhân?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.accountService.updateInfor(this.user).subscribe(
            () => {
              this.getUser();
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
