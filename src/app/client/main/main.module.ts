import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TopHeaderComponent } from './shared/top-header/top-header.component';
import { MainComponent } from './main.component';
import { CartComponent } from './cart/cart.component';
import { ClientAuthGuard } from 'src/app/shared/guard/client-auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    TopHeaderComponent,
    SidebarComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ClientAuthGuard]
})
export class MainModule { }
