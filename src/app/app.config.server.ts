import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const staticFilesInterceptor: HttpInterceptorFn = (req, next) => {
  const match = req.url.match(/\/news\/([\w.-]+)$/);
  if (match) {
    try {
      const filePath = join(process.cwd(), 'public', 'news', match[1]);
      const content = readFileSync(filePath, 'utf-8');
      const body = filePath.endsWith('.json') ? JSON.parse(content) : content;
      return of(new HttpResponse({ status: 200, body, url: req.url }));
    } catch {
      // jeśli plik nie istnieje, przekaż dalej
    }
  }
  return next(req);
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withFetch(), withInterceptors([staticFilesInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
