import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeader } from './nav-header/nav-header';
import { AppFooter } from './app-footer/app-footer';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavHeader, AppFooter],
  templateUrl: './shell.html',
})
export class Shell {}
