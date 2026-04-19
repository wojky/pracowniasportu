import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900">Strona główna</h1>
    </section>
  `,
})
export class Home {}
