import { Component, OnInit, OnDestroy } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

declare let Masonry: any;

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {

  constructor(public twitterService: TwitterService) { }

  ngOnInit() {
    const masonry = new Masonry( '#messages', {
      itemSelector: '.EmbeddedTweet'
    });

    this.twitterService.stream.subscribe(x => {
      setTimeout(() => {
        masonry.reloadItems();
        masonry.layout();
      });
    });
  }

  ngOnDestroy() {
    // this.twitterService.stream.unsubscribe();
  }
}
