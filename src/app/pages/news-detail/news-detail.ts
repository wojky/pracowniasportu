import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NewsService } from '../../news/news.service';
import { LocalDatePipe } from '../../shared/local-date.pipe';

@Component({
  selector: 'app-news-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LocalDatePipe],
  template: `
    <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <a
        routerLink="/aktualnosci"
        class="mb-6 inline-flex items-center gap-1 text-sm text-brand-blue hover:underline"
      >
        ← Powrót do aktualności
      </a>

      @if (article()) {
        <header class="mb-8">
          <time
            [dateTime]="article()!.date ?? ''"
            class="text-xs font-medium uppercase tracking-wider text-brand-blue"
          >
            {{ article()!.date | localDate }}
          </time>
          <h1 class="mt-1 text-3xl font-bold text-gray-900">{{ article()!.title }}</h1>
          @if (article()!.tags.length > 0) {
            <ul class="mt-3 flex flex-wrap gap-2" aria-label="Tagi">
              @for (tag of article()!.tags; track tag) {
                <li
                  class="rounded-full bg-brand-blue/10 px-3 py-0.5 text-xs font-medium text-brand-blue"
                >
                  {{ tag }}
                </li>
              }
            </ul>
          }
        </header>
        <div class="prose prose-blue max-w-none" [innerHTML]="article()!.html"></div>
      } @else {
        <p class="text-gray-400">Ładowanie…</p>
      }
    </article>
  `,
})
export class NewsDetail {
  readonly slug = input.required<string>();

  private readonly newsService = inject(NewsService);

  protected readonly article = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => this.newsService.getBySlug(slug))),
  );
}
