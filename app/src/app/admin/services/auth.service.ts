import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Login } from '../models/login';
import { User } from '../models/user';
import { POST_LOGIN, GET_LOGOUT } from '../../config/urls';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean = false;
  public redirectUrl: string;
  public user: User;

  constructor(private http: Http) {}

  login(credentails: Login): Observable<boolean> {
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

    let errorMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }

    this.isLoggedIn = false;

    console.error(error);

    return Observable.throw(errorMsg);
  }

}
