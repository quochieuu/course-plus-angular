import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
    private ngZone: NgZone,
    private authService: AccountService) { }
  
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage: any;
    errorMessage2 = '';
    isLoading = false;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
          console.log(data.token);
          this.isLoading = true;
        this.authService.saveToken(data.token);
        this.authService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.ngZone.run(() => this.router.navigateByUrl('/'))
        window.location.href="/";
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.errors;
        if(err.status == 401) {
          this.isLoading = false;
          this.errorMessage2 = "Tài khoản hoặc mật khẩu không đúng."
        }
      }
    );
  }

}
