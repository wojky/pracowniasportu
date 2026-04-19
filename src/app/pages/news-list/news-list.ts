import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../news/news.service';
import { LocalDatePipe } from '../../shared/local-date.pipe';

@Component({
  selector: 'app-news-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LocalDatePipe],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">Aktualności</h1>

      @if (articles()) {
        @if (articles()!.length === 0) {
          <p class="text-gray-500">Brak aktualności.</p>
        } @else {
          <ul class="flex flex-col gap-6">
            @for (article of articles(); track article.slug) {
              <li
                class="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md overflow-hidden"
              >
                <a
                  [routerLink]="['/aktualnosci', article.slug]"
                  class="group flex flex-col sm:flex-row"
                >
                  @if (article.image) {
                    <div class="relative sm:hidden h-48 shrink-0">
                      <img
                        [src]="article.image"
                        [alt]="article.title"
                        class="h-full w-full object-cover"
                      />
                      @if (article.tags.length > 0) {
                        <ul
                          class="absolute bottom-2 left-2 flex flex-wrap gap-1.5"
                          aria-label="Tagi"
                        >
                          @for (tag of article.tags; track tag) {
                            <li
                              class="rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                            >
                              {{ tag }}
                            </li>
                          }
                        </ul>
                      }
                    </div>
                  }
                  <div class="flex-1 p-6">
                    <time
                      [dateTime]="article.date ?? ''"
                      class="text-xs font-medium uppercase tracking-wider text-brand-blue"
                    >
                      {{ article.date | localDate }}
                    </time>
                    <h2
                      class="mt-1 text-xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors"
                    >
                      {{ article.title }}
                    </h2>
                    @if (article.excerpt) {
                      <p class="mt-2 text-sm text-gray-600">{{ article.excerpt }}</p>
                    }
                    @if (article.tags.length > 0) {
                      <ul class="mt-3 hidden sm:flex flex-wrap gap-2" aria-label="Tagi">
                        @for (tag of article.tags; track tag) {
                          <li
                            class="rounded-full bg-brand-blue/10 px-3 py-0.5 text-xs font-medium text-brand-blue"
                          >
                            {{ tag }}
                          </li>
                        }
                      </ul>
                    }
                  </div>
                  @if (article.image) {
                    <div class="hidden sm:block w-48 lg:w-64 shrink-0">
                      <img
                        [src]="article.image"
                        [alt]="article.title"
                        class="h-full w-full object-cover"
                      />
                    </div>
                  }
                </a>
              </li>
            }
          </ul>
        }
      } @else {
        <p class="text-gray-400">Ładowanie…</p>
      }
    </section>
  `,
})
export class NewsList {
  private readonly newsService = inject(NewsService);
  protected readonly articles = toSignal(this.newsService.getAll());
}
