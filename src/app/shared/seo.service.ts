import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_NAME = 'Pracownia Sportu';
const DEFAULT_IMAGE = 'https://wojky.github.io/pracowniasportu/logo.jpg';

export interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setPage(options: SeoOptions): void {
    const fullTitle = options.title === SITE_NAME ? SITE_NAME : `${options.title} | ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:image', content: options.image ?? DEFAULT_IMAGE });

    if (options.description) {
      this.meta.updateTag({ name: 'description', content: options.description });
      this.meta.updateTag({ property: 'og:description', content: options.description });
    }
  }
}
