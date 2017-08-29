import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tweet } from '../models/tweet';
import { environment } from '../../environments/environment';

declare let io: any;

@Injectable()
export class TwitterService {
  public stream = new BehaviorSubject<Tweet[]>([]);

  // TODO: Implement dispose to close the stream.

  constructor() {
    let socket = io(environment.socket);
    socket.emit('get_all_tweets');

    let all_tweets = [];
    socket.on('all_tweets', (tweets) => {
      tweets.forEach(tweet => this.add(tweet));
    });

    socket.on('tweet', (tweet) => {
      this.add(tweet);
    });
  }

  private add(tweet) {
    let tweets = this.stream.value;
    tweets.unshift(tweet);

    if (tweets.length > 100)
      tweets.splice(100);

    this.stream.next(tweets);
  }
}
