import { ListBannersComponent } from './list-banners/list-banners.component';
import { CreateBannerComponent } from './create-banner/create-banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CreateBannerComponent,
    ListBannersComponent
  ],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SystemsModule { }
