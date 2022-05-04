import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
  ]
})
export class MainModule { }
