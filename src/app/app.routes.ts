import { Routes } from '@angular/router';
import { Shell } from './shell/shell';
import { articleMetaResolver } from './news/article-meta.resolver';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        title: 'Witaj',
        data: {
          description:
            'Fundacja Pracownia Sportu – wspieramy trenerów, kluby i organizacje sportowe poprzez edukację, wsparcie i monitoring sportowy.',
        },
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'aktualnosci',
        title: 'Aktualności',
        data: {
          description: 'Najnowsze wiadomości i aktualności z Fundacji Pracownia Sportu.',
        },
        loadComponent: () => import('./pages/news-list/news-list').then((m) => m.NewsList),
      },
      {
        path: 'aktualnosci/:slug',
        resolve: { article: articleMetaResolver },
        loadComponent: () => import('./pages/news-detail/news-detail').then((m) => m.NewsDetail),
      },
    ],
  },
];
