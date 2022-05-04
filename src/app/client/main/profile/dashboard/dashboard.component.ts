import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { environment } from 'src/environments/environment';
import { Course } from 'src/app/shared/models/course';
import { ServerService } from 'src/app/shared/services/server.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  user: any;
  courses: Course[] = [];

  selectedFile: File | undefined;
  imageSrc: string | undefined;
  isImageChange: boolean | undefined;

  loading = false;
  isReponse = false;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private accountService: AccountService,
    private serverService: ServerService,
    private router: Router,
    private ngZone: NgZone,
    private titleService: Title) {
      this.titleService.setTitle("Trang tổng quan - Course Plus");
    }

  ngOnInit(): void {
    this.getUser();
    this.listCourses();
    this.checkAuthorize();
  }

  get f(){
    return this.myForm.controls;
  }

  checkAuthorize(): void {
    this.serverService
      .checkAuthorize()
      .subscribe((data: any) => {
        this.isReponse = true;

      },
      () => {
        this.isReponse == false;
        this.ngZone.run(() => this.router.navigateByUrl('/login'));
      });
  }


  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user)
      });
  }

  // update image
  onFileChange(event: any) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.isImageChange = true;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }


  submitUpdateAvatar() {
    var formData = new FormData();
    formData.append("file", this.selectedFile!);

    this.accountService.updateAvatar(formData).subscribe(res => {
      this.imageSrc = undefined;

      this.getUser();


    }, (err) => {

      this.getUser();

    });
  }

  listCourses(): void {
    this.loading = true;
    this.accountService
      .listCourses()
      .subscribe((data: any) => {
        this.loading = false;
        this.courses = data;
        console.log(this.courses)
      }, () => {
        this.loading = true;
      });
  }

}
