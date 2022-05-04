import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {
  rooms: any;
  users: any;
  createForm: FormGroup;
  dropdownSettings = {};
  selectedItems=[];
  currentUser: any;
  currentUserId!: string;
  user: any;

  constructor(
    public chatService: ChatService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private modalService: ModalService,
    private accountService: AccountService,
    private userService: UserService) { 
      this.createForm = this.formBuilder.group({
        name: [''],
        users: [this.selectedItems]
      });
    }

  ngOnInit(): void {
    this.getRooms();
    this.getUsers();

    this.dropdownSettings = {
      idField: 'id',
      textField: 'fullName',
      allowSearchFilter: true
    };
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  getUser(): void {
    this.accountService.getCurrentUser().subscribe((data: any) => {
      this.user = data;
      this.currentUserId = data.userId;

      console.log(this.currentUserId);
    });
  }

  getRooms() {
    this.chatService.getRooms().subscribe((data: any) => {
      console.log(data);
      this.rooms = data;
      for (let i = 0; i <= this.rooms.length; i++) {
        if (this.rooms[i].userCount === 2) {
          for (let j = 0; i <= this.rooms[i].users.length; j++) {
            if (this.currentUserId != this.rooms[i].users[j].id) {
              this.rooms[i].roomName = this.rooms[i].users[j].fullName;
            }
          }
        }
      }
    });
  }

  getUsers() {
    this.userService
      .getAll()
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  onSubmit(id: string): any {
    this.modalService.close(id);

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
        text: 'Xác nhận thêm mới danh mục?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.chatService.createRoom(this.createForm.value).subscribe(
            () => {
              this.getRooms()
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

}
