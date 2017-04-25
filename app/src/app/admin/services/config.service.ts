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
     
      let body;
      let err;

      try {
        body = error.json() || '';
        err = body.error || JSON.stringify(body);
      } catch (error) {
        err = '';
      }

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

}
