import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-nav-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, Button],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.css',
  host: {
    class: 'contents',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NavHeader {
  private readonly el = inject(ElementRef);
  private readonly baseHref = inject(DOCUMENT).querySelector('base')?.getAttribute('href') ?? '/';
  protected readonly logoSrc = this.baseHref + 'logo.jpg';
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen() && !this.el.nativeElement.contains(event.target)) {
      this.menuOpen.set(false);
    }
  }
}
