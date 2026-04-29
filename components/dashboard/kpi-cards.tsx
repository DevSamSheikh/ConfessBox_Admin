'use client';

import { Heart, MessageSquare, UserPlus, Users } from 'lucide-react';
import { Badge } from '@/components/shared/ui/badge';
import { Card } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardKpi } from '@/app/dashboard/dashboard-data';

const kpiIconByKey = {
  followers: Users,
  following: UserPlus,
  likes: Heart,
  comments: MessageSquare,
} as const;

const kpiBadgeClassByKey: Record<DashboardKpi['key'], string> = {
  followers:
    'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200',
  following:
    'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-200',
  likes: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
  comments:
    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
};

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

export const KpiCards = ({ items }: { items: DashboardKpi[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi) => {
        const Icon = kpiIconByKey[kpi.key];
        const isPositive = kpi.deltaPercent >= 0;

        return (
          <Card
            key={kpi.key}
            className={cn(
              'rounded-2xl border p-4 shadow-sm transition-transform',
              'bg-white/70 border-slate-200 hover:-translate-y-0.5',
              'dark:bg-slate-950/40 dark:border-slate-800',
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl',
                    kpiBadgeClassByKey[kpi.key],
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                    {kpi.label}
                  </div>
                  <div className="truncate text-xl font-semibold text-slate-950 dark:text-slate-50">
                    {formatCompact(kpi.value)}
                  </div>
                </div>
              </div>

              <Badge
                variant="secondary"
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium',
                  isPositive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
                )}
              >
                {isPositive ? '+' : ''}
                {kpi.deltaPercent.toFixed(1)}%
              </Badge>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

