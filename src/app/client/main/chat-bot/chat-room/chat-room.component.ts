import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ChatBotService } from 'src/app/shared/services/chat-bot.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  isHasRoom = false;
  botRoom!: any;
  createForm: FormGroup;
  messages: any;

  constructor(
    public chatbotService: ChatBotService,

    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
  ) {
    this.createForm = this.formBuilder.group({
      content: [''],
      roomId: ['']
    });
  }

  ngOnInit() {
    this.checkUserHasRoom();
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

  checkUserHasRoom() {
    this.chatbotService
      .checkUserHasRoom()
      .subscribe((data: any) => {
        this.isHasRoom = data;
        console.log(data);
        if(data == true) {
          this.getBotRoom();
        }
      });
  }

  createChatRoom() {
    this.chatbotService
      .createBotRoom({ name: ''})
      .subscribe((data: any) => {
        this.checkUserHasRoom();
      });
  }

  getMessageOfRoom(id: string) {
    this.chatbotService
      .getMessageOfRoom(id)
      .subscribe((data: any) => {
        console.log(data);
        console.log("getMessageOfRoom called");
        this.messages = data;
      });
  }

  getBotRoom() {
    this.chatbotService
      .getBotRoom()
      .subscribe((data: any) => {
        this.botRoom = data;
        console.log(data);
        this.getMessageOfRoom(data.id);
      });
  }

  getBotResponse(message: string, roomId: string) {
    this.chatbotService
      .getMessageResponse(message, roomId)
      .subscribe((data: any) => {
        console.log("Bot reponse called");
        console.log(data);
      });
  }

  onSubmit(): any {
    this.chatbotService.createBotMessageRequest(this.createForm.value).subscribe(
      () => {
        // this.getMessageOfRoom(this.botRoom.id);
        this.getBotResponse(this.createForm.value.content, this.botRoom.id);
        this.getMessageOfRoom(this.botRoom.id);
        this.getMessageOfRoom(this.botRoom.id);
        this.getMessageOfRoom(this.botRoom.id);
        this.getMessageOfRoom(this.botRoom.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
