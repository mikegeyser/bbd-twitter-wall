import { Injectable, } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Tweet } from '../models/tweet';
import { SOCKET_TWITTER } from '../config/urls';

declare let io: any;

@Injectable()
export class TwitterService {
  public stream: Observable<Array<Tweet>>;

  // TODO: Implement dispose to close the stream.

  constructor() {
    this.stream = Observable.create((observer) => {
      let socket = io(SOCKET_TWITTER);
      socket.on('tweet', (tweet) => observer.next(tweet));

      return () => {
        socket.disconnect();
      }
    });
  }
}
