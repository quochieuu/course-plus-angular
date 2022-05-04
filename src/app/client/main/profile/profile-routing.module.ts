import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { UpdateInformationComponent } from './update-information/update-information.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  // { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-profile', component: UpdateInformationComponent },
  { path: 'my-courses', component: ListCoursesComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
