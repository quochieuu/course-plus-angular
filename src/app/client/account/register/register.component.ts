import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router,
    private ngZone: NgZone,
    private authService: AccountService) { }

  ngOnInit(): void {
  }

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage : any;
  isLoading = false;

  onSubmit(): void {
    this.isLoading = true;
    this.authService.register(this.form).subscribe(
      (data :any) => {
        this.ngZone.run(() => this.router.navigateByUrl('/login'))
      },
    (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error.errors;
      }
    );
  }

}
