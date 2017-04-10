import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare let io: any;

export class Tweet {

}

@Injectable()
export class TwitterService {
  public tweets: Observable<Tweet>;

  constructor() {
    this.tweets = Observable.create((observer) => {
      let socket = io("http://localhost:3000");
      socket.on('tweet', (tweet) => observer.next(tweet));
    });
  }
}
