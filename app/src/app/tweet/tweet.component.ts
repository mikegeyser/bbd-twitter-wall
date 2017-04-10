import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() public tweet: Tweet;

  constructor() { }

  ngOnInit() {
    console.log(this.tweet);
  }

}
