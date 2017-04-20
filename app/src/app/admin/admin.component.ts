import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { without } from 'lodash';

import { Config, Twitter, Express, Event } from './models/config';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  configForm: FormGroup;
  @Input() config: Config;

  constructor(private formBuilder: FormBuilder, private configService: ConfigService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.configForm = this.formBuilder.group({

      twitter: this.formBuilder.group({
        consumer_key: [null, Validators.required],
        consumer_secret: [null, Validators.required],
        access_token: [null, Validators.required],
        access_token_secret: [null, Validators.required],
        timeout_ms: [null, Validators.required]
      }),

      express: this.formBuilder.group({
        port: [null, Validators.required],
      }),

      event: this.formBuilder.group({
        name: [null, Validators.required],
        screen_names: [null, Validators.required],
        hashtags: [null, Validators.required]
      }),

    });

    console.log(this.configForm);
  }

  parseInput(): Config {

    const formData = this.configForm.value;

    const twitter: Twitter = {
      consumer_key: formData.twitter.consumer_key as string,
      consumer_secret: formData.twitter.consumer_secret as string,
      access_token: formData.twitter.access_token as string,
      access_token_secret: formData.twitter.access_token_secret as string,
      timeout_ms: formData.twitter.timeout_ms as number
    };

    const express: Express = {
      port: formData.express.port as number
    };

    console.log(formData.event.screen_names);
    console.log(this.splitIntoArray(formData.event.screen_names, '@'));

    const event: Event = {
      name: formData.event.name,
      screen_names: this.splitIntoArray(formData.event.screen_names, '@'),
      hashtags: this.splitIntoArray(formData.event.hashtags, '#')
    };

    const config: Config = {
      twitter: twitter,
      express: express,
      event: event
    }

    return config;
  }

  splitIntoArray(value: string, token: string): Array<string> {

    if (!value) {
      return [];
    }

    const arr = value.split(token).map((val) => {
      return token + val.trim();
    });

    return without(arr, undefined);
  }

  onSubmit() {
    this.config = this.parseInput();
    this.configService.post(this.config).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  ngOnChanges() {
    // this.configForm.reset({
    //   name: this.config.twitter.name
    // });
  }

}
