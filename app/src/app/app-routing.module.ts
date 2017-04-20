import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  {
    path: 'admin',
    pathMatch: 'full',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: '',
    pathMatch: 'full',
    component: WallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
