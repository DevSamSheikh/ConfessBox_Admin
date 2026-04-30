import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-300 text-primary-foreground hover:bg-primary-300/80 dark:bg-primary-700 dark:hover:bg-primary-700/80',
        secondary:
          'border-transparent bg-secondary-300 text-secondary-foreground hover:bg-secondary-300/80 dark:bg-secondary-700 dark:hover:bg-secondary-700/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        /**
         * Soft severity — `destructive` / `destructive-foreground` (hsl vars in globals.css).
         * Dark dashboards: tint fill higher + light foreground so Violation stays readable on navy surfaces.
         */
        destructiveMuted:
          'border border-destructive/40 bg-destructive/14 text-destructive hover:bg-destructive/22 dark:border-destructive/70 dark:bg-destructive/45 dark:text-destructive-foreground dark:hover:bg-destructive/55 dark:hover:border-destructive/80',
        /** Misinformation / review — `warning` / `warning-foreground` tokens */
        warning:
          'border border-warning/50 bg-warning/12 text-warning-foreground hover:bg-warning/18 dark:border-warning/55 dark:bg-warning/22 dark:text-warning-foreground dark:hover:bg-warning/28',
        /** Neutral — `muted`, `muted-foreground`, `border` */
        neutral:
          'border border-border bg-muted/80 text-muted-foreground hover:bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariantName = NonNullable<
  VariantProps<typeof badgeVariants>['variant']
>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
