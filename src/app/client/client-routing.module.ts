import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, loadChildren: () => import('./main/main.module').then(m => m.MainModule)  },
  { path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
