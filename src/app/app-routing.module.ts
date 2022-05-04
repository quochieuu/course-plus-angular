import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
