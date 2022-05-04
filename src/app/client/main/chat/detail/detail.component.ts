import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from 'src/app/shared/models/chat-message';
import { Message } from 'src/app/shared/models/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './../index/index.component.scss',
    './detail.component.scss',
  ],
})
export class DetailComponent implements OnInit {
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  messages: any;
  message: any;
  roomId!: string;
  createForm: FormGroup;
  user: any;
  users: any;
  room: any;
  rooms: any;
  roomName!: string;
  receiverAvatar!: string;
  senderAvatar!: string;
  currentUserId!: string;
  isRoom = false;

  constructor(
    private modalService: ModalService,
    public chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService
  ) {
    this.createForm = this.formBuilder.group({
      content: [''],
      roomId: [''],
      userId: [''],
    });
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['roomId'];
    this.getMessages(this.roomId);
    this.scrollToBottom();
    this.getUser();
    this.getUsers();
    this.getRoom(this.roomId);
    this.getRooms();

    this.chatService
      .retrieveMappedObject()
      .subscribe((receivedObj: Message) => {
        this.addToInbox(receivedObj);
      });
  }

  addToInbox(obj: Message) {
    let newObj = new Message();
    newObj.content = obj.content;
    newObj.roomId = obj.roomId;
    newObj.userId = obj.userId;
    this.messages.push(newObj);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getMessages(roomId: string) {
    this.chatService.getMessagesByRoom(roomId).subscribe((data: any) => {
      console.log(data);
      this.messages = data;
    });
  }

  getUsers() {
    this.userService
      .getAll()
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  onSubmit(): any {
    this.chatService.createMessage(this.createForm.value).subscribe(
      () => {
        this.message = new ChatMessage();
        this.message.roomId = this.createForm.value.roomId;
        this.message.content = this.createForm.value.content;
        this.message.userId = this.createForm.value.userId;
        // this.messages.push(this.message);
        this.chatService.broadcastMessage(this.message);
        // this.getMessages(this.roomId);
      },
      (err) => {
        console.log(err);
      }
    );
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

  getRoom(id: string) {
    this.chatService.getRoom(id).subscribe((data: any) => {
      console.log(data);
      this.room = data;
      if (this.room.userCount > 2) {
        this.isRoom = true;
        this.roomName = this.room.roomName;
        this.receiverAvatar = 'room';
      } else if (this.room.userCount == 2) {
        for (let i = 0; i <= this.room.users.length; i++) {
          if (this.currentUserId != this.room.users[i].id) {
            this.isRoom = false;
            this.roomName = this.room.users[i].fullName;
            this.receiverAvatar = this.room.users[i].avatarUrl;
            console.log('this.receiverAvatar');
            console.log(this.receiverAvatar);
          } else {
            this.senderAvatar = this.room.users[i].avatarUrl;
            this.roomName = 'DEFAULT';
          }
        }
      } else {
        this.roomName = 'DEFAULT';
      }
    });
  }

  delete(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa sách?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.chatService.delete(id).subscribe((res) => {
            this.rooms = this.rooms.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getRooms();
          this.getRooms();
          this.getRooms();
          this.getRooms();
          this.ngZone.run(() => this.router.navigateByUrl('chat/index'));
          this.getRooms();

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  loadRoom(id: string) {
    this.roomId = id;
    this.chatService.joinGroup(id);
    this.getMessages(id);
    this.scrollToBottom();
    this.getUser();
    this.getRoom(id);
    this.getRooms();
    this.ngZone.run(() => this.router.navigateByUrl('chat/' + id));
  }
}
