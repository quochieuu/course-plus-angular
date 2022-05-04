import { FilterCoursesComponent } from './filter-courses/filter-courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { CourseLearnComponent } from './course-learn/course-learn.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';

const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ListCoursesComponent },
  { path: 'category', component: ListCategoriesComponent },
  { path: 'detail/:slug', component: CourseIntroComponent },
  { path: 'learn/:slug/:lecId', component: CourseLearnComponent },
  { path: 'filter', component: FilterCoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
