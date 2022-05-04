import { Router } from '@angular/router';
import { WishlistService } from './../../../../shared/services/wishlist.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Course } from 'src/app/shared/models/course';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';
import { CourseService } from '../course.service';
import { ServerService } from 'src/app/shared/services/server.service';

@Component({
  selector: 'app-course-intro',
  templateUrl: './course-intro.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './course-intro.component.scss']
})
export class CourseIntroComponent implements OnInit {
  course: Course | any;
  feedbacks!: any;
  slug!: string;

  closeResult: string | undefined;

  urlSafe!: SafeResourceUrl;
  introUrl!: string;

  isInCourse!: boolean;

  isLogin = false;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public courseService: CourseService,
    public wishlistService: WishlistService,
    public cartService: CartService,
    private _toastService: ToastService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    private titleService: Title,
    public serverService: ServerService,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getCourseDetail(this.slug);

  }

  // Modal
  open(content: any) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // End modal

  getCourseDetail(slug: string) {
    this.courseService
      .findBySlug(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.course = data;
        this.titleService.setTitle(this.course.name + " - Course Plus");
        this.introUrl = data.urlYoutubeVideo;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.introUrl);
        this.checkAuthorize();

      });
  }

  addToCart(id: string) {
    this.cartService.addItemToCart(id)
    .subscribe((data: any) => {
      this.addInfoToast("Đã thêm khoá học vào giỏ hàng của bạn!");
      this.getCourseDetail(this.slug);
    });
  }

  requireLogin() {
    if(this.isLogin == false) {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    }
  }

  addToWishlist(id: string) {
    if(this.isLogin == false) {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    } else {
      this.wishlistService.create(id)
      .subscribe((data: any) => {
        this.addInfoToast("Lưu khoá học thành công!");
        this.getCourseDetail(this.slug);
      });
    }

  }

  registerCourse(id: string) {
    this.courseService.registerCourse(id)
    .subscribe((data: any) => {
      this.addInfoToast("Đăng ký khoá học thành công! Bây giờ bạn có thể tham gia học khoá học này.")
      this.getCourseDetail(this.slug);
    });
  }

  checkUserInCourse(id: string) {
    this.courseService.checkUserInCourse(id)
    .subscribe((data: any) => {
      this.isInCourse = data;
      console.log(this.isInCourse);
    });
  }

  addInfoToast(message: string) {
    this._toastService.info(message);
  }

  getFeedbacks(courseId: string) {
    this.courseService.getFeedbacks(courseId)
    .subscribe((data: any) => {
      this.feedbacks = data;
      console.log(this.feedbacks);
    });
  }

  checkAuthorize() {
    this.serverService
      .checkAuthorize()
      .subscribe((data: any) => {
        console.log(data);
        this.isLogin = true;
        this.checkUserInCourse(this.course.id);
      },
      (err: any) => {
        this.isLogin = false;
      });
  }

}
