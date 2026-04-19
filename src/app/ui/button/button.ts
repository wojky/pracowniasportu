import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex',
  },
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-disabled]="disabled() || null"
      [class]="buttonClasses()"
    >
      <ng-content select="[slot=icon-left]" />
      <span><ng-content /></span>
      <ng-content select="[slot=icon-right]" />
    </button>
  `,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);

  protected buttonClasses() {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-brand-blue text-white hover:bg-brand-blue/90 focus-visible:outline-brand-blue',
      secondary: 'bg-brand-red text-white hover:bg-brand-red/90 focus-visible:outline-brand-red',
      outline:
        'border border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue/10 focus-visible:outline-brand-blue',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return [base, variants[this.variant()], sizes[this.size()]].join(' ');
  }
}
