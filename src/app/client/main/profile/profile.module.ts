import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UpdateInformationComponent } from './update-information/update-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularToastifyModule, ToastService } from 'angular-toastify';


@NgModule({
  declarations: [
    UpdateInformationComponent,
    ChangePasswordComponent,
    ListCoursesComponent,
    WishlistComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularToastifyModule
  ],
  providers: [ToastService]
})
export class ProfileModule { }
