import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';

import { API_URL } from '../../config/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private errorMessage: string = null;
  private isBusy: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public router: Router) {
    this.loginForm = this.formBuilder.group({
      user: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  doLogin(event) {

    console.info('LoginComponent#doLogin');

    this.isBusy = true;
    this.errorMessage = null;

    const credentails: Login = this.loginForm.value;

    this.authService.login(credentails).subscribe(
      (data) => {
        console.info('LoginComponent#doLogin: data', data);

        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

          // Redirect the user
          this.router.navigate([redirect]);
        }
      },
      (error) => {
        console.info('LoginComponent#doLogin: error', error);
        this.errorMessage = error;
        this.isBusy = false;
      },
      // () => { 
      //   console.info('LoginComponent#final');
      //   this.isBusy = false;
      //  }
    );
  }

}
