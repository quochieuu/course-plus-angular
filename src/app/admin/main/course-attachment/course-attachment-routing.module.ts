import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'create/:lectureId', component: CreateComponent },
  { path: ':id', component: IndexComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseAttachmentRoutingModule { }
