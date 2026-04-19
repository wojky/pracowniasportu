import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { marked } from 'marked';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import type { NewsArticle, NewsArticleMeta } from './news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly baseHref = inject(DOCUMENT).querySelector('base')?.getAttribute('href') ?? '/';
  private readonly base = `${this.baseHref}news`;

  private readonly manifest$: Observable<NewsArticleMeta[]> = this.http
    .get<NewsArticleMeta[]>(`${this.base}/manifest.json`)
    .pipe(shareReplay(1));

  getAll(): Observable<NewsArticleMeta[]> {
    return this.manifest$;
  }

  getBySlug(slug: string): Observable<NewsArticle> {
    return this.manifest$.pipe(
      map((list) => {
        const meta = list.find((a) => a.slug === slug);
        if (!meta) throw new Error(`Article not found: ${slug}`);
        return meta;
      }),
      switchMap((meta) =>
        this.http.get(`${this.base}/${meta.slug}.md`, { responseType: 'text' }).pipe(
          map((raw) => {
            const body = raw.replace(/^---[\s\S]*?---\n?/, '');
            const html = marked.parse(body) as string;
            return { ...meta, html };
          }),
        ),
      ),
    );
  }
}
