import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'relativeTime'
})

export class RelativeTimePipe implements PipeTransform {

  transform(inputDate: string): string {
    const current = new Date().valueOf();
    const input = new Date(Date.parse(inputDate)).valueOf();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - input;

    if (elapsed < msPerMinute) {
      let value = Math.round(elapsed / 1000);
      let seconds = (value === 1) ? 'second' : 'seconds';
      return `${value} ${seconds} ago`;
    }

    else if (elapsed < msPerHour) {
      let value = Math.round(elapsed / msPerMinute);
      let minutes = (value === 1) ? 'minute' : 'minutes';
      return `${value} ${minutes} ago`;
    }

    else if (elapsed < msPerDay) {
      let value = Math.round(elapsed / msPerHour);
      let hours = (value === 1) ? 'hour' : 'hours';
      return `${value} ${hours} ago`;
    }

    else if (elapsed < msPerMonth) {
      let value = Math.round(elapsed / msPerDay);
      let days = (value === 1) ? 'day' : 'days';
      return `approximately ${value} ${days} days ago`;
    }

    else if (elapsed < msPerYear) {
      let value = Math.round(elapsed / msPerMonth);
      let months = (value === 1) ? 'month' : 'months';
      return `approximately ${value} ${months} ago`;
    }

    else {
      let value = Math.round(elapsed / msPerYear);
      let years = (value === 1) ? 'year' : 'years';
      return `approximately ${value} ${years} ago`;
    }

  }
}
