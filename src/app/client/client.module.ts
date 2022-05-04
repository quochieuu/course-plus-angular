import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ClientComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule
  ]
})
export class ClientModule { }
