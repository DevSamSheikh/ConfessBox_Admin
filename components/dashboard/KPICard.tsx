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
    <Card className="flex min-h-[112px] items-center gap-3 rounded-xl border border-white/10 bg-[#171526] p-4 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-gray-400">{label}</div>
        <div className="mt-0.5 text-xl font-semibold leading-none text-white tabular-nums sm:text-2xl">
          {value}
        </div>
      </div>
      <div className="flex shrink-0 items-center self-end sm:self-center">
        <div
          className={cn(
            'rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs',
            changeTone === 'positive'
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500/20 bg-red-500/10 text-red-400',
          )}
        >
          {change}
        </div>
      </div>
    </Card>
  );
};

