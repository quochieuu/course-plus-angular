import { AccountService } from 'src/app/shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'meeting-room-chat',
  templateUrl: './meeting-room.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {

  domain: string = "meet.jit.si"; // For self hosted use your domain
    room: any;
    options: any;
    api: any;
    user: any;
    cur_user: any;
    fullName!: string;
    roomCode!: string;


    // For Custom Controls
    isAudioMuted = false;
    isVideoMuted = false;

    constructor(
        private router: Router,
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) {
      this.roomCode = this.route.snapshot.params['id'];
    }

    getUser = () =>{
      this.accountService
        .getCurrentUser()
        .subscribe((data: any) => {
          this.cur_user = data;
          this.fullName = data.fullName;

          this.createMeeting();
        });
    }

    ngOnInit(): void {
      this.getUser();


    }

    createMeeting = () => {
      this.room = this.roomCode;
        this.user = {
          name: this.fullName
        }

        this.options = {
            roomName: this.room,
            width: '98%',
            height: 600,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.fullName
            }
        }

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

         // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }



    handleClose = () => {
      console.log("handleClose");
    }


  handleParticipantLeft = async (participant: any) => {
      console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
      const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
      console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
      const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
      console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
      const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
      console.log("handleVideoConferenceLeft");
      this.router.navigate(['/thank-you']);
  }

  handleMuteStatus = (audio: any) => {
      console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video: any) => {
      console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(this.api.getParticipantsInfo()); // get all participants
          }, 500)
      });
  }
  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if(command == 'hangup') {
        this.router.navigate(['/thank-you']);
        return;
    }

    if(command == 'toggleAudio') {
        this.isAudioMuted = !this.isAudioMuted;
    }

    if(command == 'toggleVideo') {
        this.isVideoMuted = !this.isVideoMuted;
    }
  }



}
