import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatBot } from '../models/chat-bot';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      };
  }

  getAll(): Observable<ChatBot[]> {
    return this.httpClient
        .get<ChatBot[]>(this.apiURL + '/api/chat-bot/get-all', this.httpOptions)
        .pipe();
  }

  getBotRoom(): Observable<any> {
    return this.httpClient
        .get<any>(this.apiURL + '/api/chat-bot/get-bot-room', this.httpOptions)
        .pipe();
  }

  createQuestion(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/chat-bot/question/create', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  createResponse(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/chat-bot/response/create', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  createBotRoom(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/chat-bot/room/create', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  checkUserHasRoom(): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/chat-bot/check-user-has-room', this.httpOptions)
        .pipe();
  }

  createBotMessageRequest(item: any): Observable<any> {
    return this.httpClient
        .post<any>(this.apiURL + '/api/chat-bot/create-bot-message-request', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  getMessageOfRoom(roomId: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/chat-bot/messages/' + roomId, this.httpOptions)
        .pipe();
  }

  deleteMessage(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/chat-bot/delete-message/' + id, this.httpOptions)
  }

  deleteMessageOfRoom(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/chat-bot/delete-message-history/' + id, this.httpOptions)
  }

  deleteRoom(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/chat-bot/delete-room/' + id, this.httpOptions)
  }

  deleteQuestion(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/chat-bot/delete-question/' + id, this.httpOptions)
  }

  deleteResponse(id: string) {
    return this.httpClient
        .delete<any>(this.apiURL + '/api/chat-bot/delete-response/' + id, this.httpOptions)
  }

  getRoomById(roomId: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/chat-bot/get-room-by-id/' + roomId, this.httpOptions)
        .pipe();
  }

  getMessageById(roomId: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/chat-bot/get-message-by-id/' + roomId, this.httpOptions)
        .pipe();
  }

  getMessageResponse(message: string, roomId: string): Observable<any[]> {
    return this.httpClient
        .get<any[]>(this.apiURL + '/api/chat-bot/get-message-response/'+ roomId +'?message=' + message, this.httpOptions)
        .pipe();
  }

}
