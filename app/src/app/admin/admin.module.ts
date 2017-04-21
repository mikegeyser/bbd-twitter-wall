import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: AdminComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ConfigService
  ]
})

export class AdminModule { }
