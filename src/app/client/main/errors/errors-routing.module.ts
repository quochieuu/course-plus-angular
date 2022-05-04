import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerResponseComponent } from './server-response/server-response.component';

const routes: Routes = [
  { path: '404', component: NotFoundComponent },
  { path: 'offline', component: ServerResponseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
