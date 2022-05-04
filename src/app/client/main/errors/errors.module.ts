import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerResponseComponent } from './server-response/server-response.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    ServerResponseComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
