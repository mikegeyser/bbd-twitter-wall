import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Config, Event, Express, Twitter, config } from '../models/config';
import { POST_CONFIG, GET_CONFIG } from '../../config/urls';

@Injectable()
export class ConfigService {

  constructor(private http: Http) { }

  fetchConfig(): Observable<Config> {
    return this.http.get(GET_CONFIG)
      .map(this.onResponse)
      .catch(this.handleError);
  }

  postConfig(newConfig: Config): Observable<Config> {
    return this.http.post(POST_CONFIG, Config)
      .map(this.onResponse)
      .catch(this.handleError);
  }

  private onResponse(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {

    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
