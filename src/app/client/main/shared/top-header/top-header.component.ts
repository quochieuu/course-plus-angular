import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServerService } from 'src/app/shared/services/server.service';
import { environment } from 'src/environments/environment';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './top-header.component.scss'
  ]
})
export class TopHeaderComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  userData: any;
  constructor(private accountService: AccountService,
    private ngZone: NgZone,
    public serverService: ServerService,
    public router: Router,) { }

  ngOnInit(): void {
    this.getUser();
    this.checkServerReponse();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.userData = data;
      });
  }

  logOut(): void {
    this.accountService.signOut();
    window.location.reload();
  }

  checkServerReponse() {
    this.serverService
      .checkServerReponse()
      .subscribe((data: any) => {
        console.log(data);
      },
      (err: any) => {
        this.ngZone.run(() => this.router.navigateByUrl('/error/offline'));
      });
  }

  checkAuthorize() {
    this.serverService
      .checkAuthorize()
      .subscribe((data: any) => {
        console.log(data);
      },
      (err: any) => {

      });
  }
}
