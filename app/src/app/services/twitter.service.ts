import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../models/tweet';
import { environment } from '../../environments/environment';

declare let io: any;

@Injectable()
export class TwitterService {
  public stream: Observable<Array<Tweet>>;

  // TODO: Implement dispose to close the stream.

  constructor() {
    this.stream = Observable.create((observer) => {
      let socket = io(environment.socket);
      socket.on('tweet', (tweet) => observer.next(tweet));

      return () => {
        socket.disconnect();
      }
    });
  }
}
