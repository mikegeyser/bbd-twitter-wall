import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WallComponent
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    pathMatch: 'full',
    loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
