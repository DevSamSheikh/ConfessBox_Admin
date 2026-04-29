'use client';

import type React from 'react';
import { Card } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';

export const KPICard = ({
  icon,
  label,
  value,
  change,
  changeTone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeTone: 'positive' | 'negative';
}) => {
  return (
    <Card className="flex min-h-[112px] items-center gap-3 rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--db-overlay-strong)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-[var(--db-text-secondary)]">{label}</div>
        <div className="mt-0.5 text-xl font-semibold leading-none text-[var(--db-text-primary)] tabular-nums sm:text-2xl">
          {value}
        </div>
      </div>
      <div className="flex shrink-0 items-center self-end sm:self-center">
        <div
          className={cn(
            'rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs',
            changeTone === 'positive'
              ? 'border-[color-mix(in_srgb,var(--db-accent-emerald)_30%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-emerald)_12%,transparent)] text-[var(--db-accent-emerald)]'
              : 'border-[color-mix(in_srgb,var(--db-accent-red)_30%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-red)_12%,transparent)] text-[var(--db-accent-red)]',
          )}
        >
          {change}
        </div>
      </div>
    </Card>
  );
};

