import { FilterCoursesComponent } from './filter-courses/filter-courses.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { CourseLearnComponent } from './course-learn/course-learn.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularToastifyModule, ToastService } from 'angular-toastify';


@NgModule({
  declarations: [
    ListCoursesComponent,
    ListCategoriesComponent,
    CourseIntroComponent,
    CourseLearnComponent,
    FilterCoursesComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgxPaginationModule,
    AngularToastifyModule
  ],
  providers: [ToastService]
})
export class CourseModule { }
