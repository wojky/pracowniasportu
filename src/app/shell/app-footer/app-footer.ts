import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './app-footer.html',
  host: { class: 'contents' },
})
export class AppFooter {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly logoSrc = inject(PlatformLocation).getBaseHrefFromDOM() + 'logo.jpg';
}
