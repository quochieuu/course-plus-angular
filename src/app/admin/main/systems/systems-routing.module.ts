import { CreateBannerComponent } from './create-banner/create-banner.component';
import { ListBannersComponent } from './list-banners/list-banners.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'banner', redirectTo: 'banner/index', pathMatch: 'full'},
  	{ path: 'index', component: ListBannersComponent },
  	{ path: 'create', component: CreateBannerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }
