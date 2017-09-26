import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../models/tweet';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

declare const io: any;

@Injectable()
export class TwitterService {
  public stream: Observable<Array<Tweet>>;

  constructor(http: Http) {
    const socket = io(environment.socket);

    const get = http
      .get('http://localhost:3000/tweets')
      .map(response => response.json());

    const emit = tweets =>
      Observable.create(observer => {
        observer.next(tweets);

        socket.on('tweet', tweet => {
          tweets.unshift(tweet);

          if (tweets.length > 100) {
            tweets.splice(100);
          }

          observer.next(tweets);
        });
      });

    this.stream = get.mergeMap(x => emit(x));
  }
}
