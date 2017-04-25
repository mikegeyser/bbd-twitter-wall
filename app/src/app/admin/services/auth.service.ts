import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Login } from '../models/login';
import { User } from '../models/user';
import { POST_LOGIN, GET_LOGOUT } from '../../config/urls';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean = true;
  public redirectUrl: string;
  public user: User;

  constructor(private http: Http) { }

  login(credentails: Login): Observable<boolean> {
    console.info('AuthService#login', credentails);

    return this.http.post(POST_LOGIN, credentails)
      .map(this.onLoginResponse)
      .catch(this.handleError);
  }

  logout(): Observable<boolean> {
    return this.http.get(GET_LOGOUT)
      .map(this.onLogoutResponse)
      .catch(this.handleError);
  }

  private onLoginResponse(res: Response) {

    console.info('AuthService#onLoginResponse', res);

    this.isLoggedIn = true;

    // TODO: parse user object check for api token
    // let body = res.json();

    return this.isLoggedIn;
  }

  private onLogoutResponse(res: Response) {
    this.isLoggedIn = false;

    // let body = res.json();
    // TODO: clear user object

    return this.isLoggedIn;
  }

  private handleError(error: Response | any) {

    console.info('AuthService#handleError', error);

    let errorMsg: string;

    if (error instanceof Response) {

      let body;
      let err;

      try {
        body = error.json() || '';
        err = body.error || JSON.stringify(body);
      } catch (error) {
        err = '';
      }

      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }

    this.isLoggedIn = false;

    return Observable.throw(errorMsg);
  }

}
