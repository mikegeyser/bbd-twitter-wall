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

  private isBusy: boolean = false;
  private responseMessage: string = '';

  configForm: FormGroup;
  @Input() config: Config;

  constructor(private formBuilder: FormBuilder, private configService: ConfigService) {
    this.createForm();
  }

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.isBusy = true;

    this.configService.fetchConfig().subscribe(
      (data) => {
        this.config = data;
      },
      (error) => {
        this.responseMessage = <any>error;
      },
      () => { this.isBusy = false; }
    );
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

    const event: Event = {
      name: formData.event.name as string,
      screen_names: this.parseIntoArray(formData.event.screen_names, /^@[a-zA-Z0-9_]{1,15}$/) as string[],
      hashtags: this.parseIntoArray(formData.event.hashtags, /^#[a-zA-Z]{1}[a-zA-Z0-9_]{1,138}$/) as string[]
    };

    const config: Config = {
      twitter: twitter,
      express: express,
      event: event
    }

    return config;
  }

  parseIntoArray(value: string, pattern: RegExp): Array<string> {

    if (!value) {
      return [];
    }

    const arr = value.split(' ').map((val) => {
      const check = val.trim();
      if (check && pattern.test(check)) {
        return check;
      }
    });

    return without(arr, undefined);
  }

  splitIntoArray(value: string, token: string): Array<string> {

    if (!value) {
      return [];
    }

    const arr = value.split(token).map((val) => {
      if (val) {
        return token + val.trim();
      }
    });

    return without(arr, undefined);
  }

  onSubmit() {
    this.config = this.parseInput();

    this.isBusy = true;

    this.configService.postConfig(this.config).subscribe(
      (data) => {
        this.config = data;
      },
      (error) => {
        this.responseMessage = <any>error;
      },
      () => { this.isBusy = false; }
    );

    this.ngOnChanges();
  }

  ngOnChanges() {
    this.configForm.controls.twitter.reset({
      consumer_key: this.config.twitter.consumer_key,
      consumer_secret: this.config.twitter.consumer_secret,
      access_token: this.config.twitter.access_token,
      access_token_secret: this.config.twitter.access_token_secret,
      timeout_ms: this.config.twitter.timeout_ms
    });

    this.configForm.controls.express.reset({
      port: this.config.express.port
    });

    this.configForm.controls.event.reset({
      name: this.config.event.name,
      screen_names: this.config.event.screen_names.join(' '),
      hashtags: this.config.event.hashtags.join(' ')
    });
  }

}
