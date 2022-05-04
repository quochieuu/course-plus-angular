import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../shared/guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AdminAuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule)  },
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
