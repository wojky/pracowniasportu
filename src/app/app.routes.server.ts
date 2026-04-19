import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'aktualnosci/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const raw = readFileSync(join(process.cwd(), 'public', 'news', 'manifest.json'), 'utf-8');
      const manifest: Array<{ slug: string }> = JSON.parse(raw);
      return manifest.map(({ slug }) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
