import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { NewsService } from '../news/news.service';
import type { NewsArticleMeta } from '../news/news.model';

export const articleMetaResolver: ResolveFn<NewsArticleMeta | null> = (route) => {
  const slug = route.paramMap.get('slug') ?? '';
  return inject(NewsService)
    .getAll()
    .pipe(map((articles) => articles.find((a) => a.slug === slug) ?? null));
};
