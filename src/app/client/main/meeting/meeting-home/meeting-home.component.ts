import { MeetingRoom } from './../../../../shared/models/meeting-room';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-meeting-home',
  templateUrl: './meeting-home.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './meeting-home.component.scss']
})
export class MeetingHomeComponent implements OnInit {
  hosted: MeetingRoom[] = [];
  createForm: FormGroup;

  constructor(
    public meetingService: MeetingService,

    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
  ) {
    this.createForm = this.formBuilder.group({
      roomCode: [''],
    });
  }

  ngOnInit() {
    this.getAllHosted();
  }

  joinRoom(idRoom: string) {
    this.meetingService
      .getByName(idRoom)
      .subscribe((data: any) => {
        console.log(data);
        if(data != null) {
          this.ngZone.run(() => this.router.navigateByUrl('/meeting/' + data.name));
        } else {
          console.log("This room is not exist");
        }
      });
  }

  submitJoinRoom(): any {
    this.joinRoom(this.createForm.value.roomCode);
  }

  createRoom() {
    this.meetingService
      .create({})
      .subscribe((data: any) => {
        console.log(data);
        this.getRoom(data.id);
      });
  }

  deleteRoom(id: string) {
    this.meetingService
      .delete(id)
      .subscribe((data: any) => {
        this.getRoom(data.id);
        this.getRoom(data.id);
        this.getRoom(data.id);
        this.getRoom(data.id);
      });
  }

  getRoom(id: string) {
    this.meetingService
      .getById(id)
      .subscribe((data: any) => {
        console.log(data);
        this.ngZone.run(() => this.router.navigateByUrl('/meeting/' + data.name));
      });
  }

  getAllHosted() {
    this.meetingService
      .getAllHosted()
      .subscribe((data: any) => {
        console.log(data);
        this.hosted = data;
      });
  }

}
