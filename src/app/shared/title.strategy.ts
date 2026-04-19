import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import type { NewsArticleMeta } from '../news/news.model';

const SITE_NAME = 'Pracownia Sportu';
const DEFAULT_IMAGE = 'https://wojky.github.io/pracowniasportu/logo.jpg';
const DEFAULT_DESCRIPTION =
  'Fundacja Pracownia Sportu – wspieramy trenerów, kluby i organizacje sportowe poprzez edukację, wsparcie i monitoring sportowy.';

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);

    // Pobierz dane z aktywnej (najgłębszej) trasy
    let current = snapshot.root;
    while (current.firstChild) current = current.firstChild;
    const data = current.data;

    const article = data['article'] as NewsArticleMeta | undefined;

    const pageTitle = article?.title ?? routeTitle;
    const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
    const description = article?.excerpt ?? (data['description'] as string | undefined) ?? DEFAULT_DESCRIPTION;
    const image = article?.image ?? (data['ogImage'] as string | undefined) ?? DEFAULT_IMAGE;

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
  }
}
