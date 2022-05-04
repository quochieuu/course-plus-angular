import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: ':roomId', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
