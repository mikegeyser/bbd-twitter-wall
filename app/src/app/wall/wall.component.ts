import { Component, OnInit, OnDestroy } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

declare let jQuery: any;

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
  public tweets = [];

  constructor(public twitterService: TwitterService) { }

  ngOnInit() {
    let $messages = jQuery('#messages');

    $messages.masonry({
      itemSelector: '.EmbeddedTweet'
    });

    this.twitterService.stream.subscribe(x => {
      console.log(x);
      this.tweets.unshift(x);

      setTimeout(() => {
        $messages.masonry('reloadItems');
        $messages.masonry('layout');
      });
    });
  }

  ngOnDestroy() {
    // this.twitterService.stream.unsubscribe();
  }
}
