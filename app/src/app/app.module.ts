import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { TwitterService } from './services/twitter.service';
import { TweetComponent } from './tweet/tweet.component';
import { RelativeTimePipe } from './pipe/relative-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WallComponent,
    TweetComponent,
    RelativeTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
