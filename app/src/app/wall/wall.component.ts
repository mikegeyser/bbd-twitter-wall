import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(public twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.tweets.subscribe(x => console.log(x));
  }

}
