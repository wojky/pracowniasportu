import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'home'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'phone'
  | 'mail'
  | 'location'
  | 'user'
  | 'calendar'
  | 'check'
  | 'arrow-right';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './icons.css',
  template: `
    <span
      [class]="'icon icon-' + name()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    ></span>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  /** Provide when the icon conveys meaning on its own (no adjacent text label). */
  readonly label = input<string>('');
}
