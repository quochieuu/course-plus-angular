import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';
import { AngularToastifyModule, ToastService } from 'angular-toastify';


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    AngularToastifyModule
  ],
  providers: [ToastService]
})
export class UsersModule { }
