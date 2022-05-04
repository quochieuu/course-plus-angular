import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import * as signalR from '@microsoft/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChatRoom } from '../models/chat-room';
import { ChatMessage } from '../models/chat-message';
import { EventEmitter } from '@angular/core';  

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};

  messageReceived = new EventEmitter<Message>(); 

  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl(this.apiURL + '/chatsocket', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

  private receivedMessageObject: Message = new Message();
  private sharedObj = new Subject<Message>();

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    
    this.httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.currentUser.token}`
        })
    };

    this.connection.onclose(async () => {
        await this.start();
    });

    this.connection.on('SendMessage', (roomId: string, content: string, userId: string) => {
        this.mapReceivedMessage(roomId, content, userId);
    });

    this.start();

  }

  getRooms(): Observable<ChatRoom[]> {
    return this.http
        .get<ChatRoom[]>(this.apiURL + '/api/room/get-all', this.httpOptions)
        .pipe();
  }

  getRoom(id: string): Observable<ChatRoom> {
    return this.http
        .get<ChatRoom>(this.apiURL + '/api/room/get-by-id/' + id, this.httpOptions)
        .pipe();
  }

  getMessagesByRoom(roomId: string): Observable<ChatMessage[]> {
    return this.http
        .get<ChatMessage[]>(this.apiURL + '/api/message/room/' + roomId, this.httpOptions)
        .pipe();
  }

  createRoom(item: any): Observable<ChatRoom> {
    return this.http
        .post<ChatRoom>(this.apiURL + '/api/room/create', JSON.stringify(item), {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }

  createMessage(item: any): Observable<ChatMessage> {
    return this.http
        .post<ChatMessage>(this.apiURL + '/api/message/create', JSON.stringify(item), {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      })
        .pipe();
  }

  delete(id: string) {
    return this.http
        .delete<ChatRoom>(this.apiURL + '/api/room/delete/' + id, this.httpOptions)
  }

  

  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log(this.connection);
      console.log('connected');
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(roomId: string, content: string, userId: string): void {
    this.receivedMessageObject.roomId = roomId;
    this.receivedMessageObject.content = content;
    this.receivedMessageObject.userId = userId;
    this.sharedObj.next(this.receivedMessageObject);
    console.log("CALLED mapReceivedMessage")
    console.log(this.sharedObj)
  }


  public broadcastMessage(msgDto: Message) {
    this.connection.invoke("SendMessage", msgDto.roomId, msgDto.content, msgDto.userId)
     .then(() => { console.log('message sent successfully to hub'); })
     .catch((err: any) => console.error(err));
  }

  public joinGroup(groupName: string) {
    this.connection.invoke("JoinGroup", groupName)
     .then(() => { console.log('join group oke'); })
     .catch((err: any) => console.error(err));
  }

  public retrieveMappedObject(): Observable<Message> {
    return this.sharedObj.asObservable();
  }
}