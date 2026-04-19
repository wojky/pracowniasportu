import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localDate' })
export class LocalDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return new Intl.DateTimeFormat(navigator.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  }
}
