import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumCategoryRoutingModule } from './forum-category-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ForumCategoryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ForumCategoryModule { }
