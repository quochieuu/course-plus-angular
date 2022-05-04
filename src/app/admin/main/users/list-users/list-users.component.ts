import { UserService } from './../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from 'angular-toastify';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  users: any = [];
  totalItems: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public userService: UserService,
    private _toastService: ToastService,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageChange(event: number): void {
    this.p = event;
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getPage(this.p, event.target.value, this.query);
    this.handlePageChange(this.p);
  }

  handleSearch(ev: any) {
    this.query = ev.target.value;
    this.getPage(this.p, this.pageSize, ev.target.value);
  }

  getPage(p: number, pageSize: number, query: string) {
    this.userService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.users = data.items;
        this.totalItems = data.totalRecords;
      });
  }

  addInfoToast(message: string) {
    this._toastService.info(message);
  }

  copy(text: string){
    this._clipboardService.copy(text);
    this.addInfoToast("Copy user id successful!")
  }


}
