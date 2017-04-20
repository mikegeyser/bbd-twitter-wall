import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Config, Event, Express, Twitter, config } from '../models/config';

@Injectable()
export class ConfigService {

  constructor() { }

  // Fake server get; assume nothing can go wrong
  fetch(): Observable<Config> {
    return of(config).delay(500); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  post(newConfig: Config): Observable<Config> {
    // const oldConfig = heroes.find(h => h.id === hero.id);
    const nextConfig = Object.assign(config, newConfig); // Demo: mutate cached hero
    return of(nextConfig).delay(500); // simulate latency with delay
  }

}
