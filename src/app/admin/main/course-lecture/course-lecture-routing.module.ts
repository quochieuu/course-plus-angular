import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: ':id', component: IndexComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'update/:id/:sectionId', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLectureRoutingModule { }
