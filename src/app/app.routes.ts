import { Routes } from '@angular/router';
import { Shell } from './shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'aktualnosci',
        loadComponent: () => import('./pages/news-list/news-list').then((m) => m.NewsList),
      },
      {
        path: 'aktualnosci/:slug',
        loadComponent: () => import('./pages/news-detail/news-detail').then((m) => m.NewsDetail),
      },
    ],
  },
];
