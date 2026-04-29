'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardAudienceSegment } from '@/app/dashboard/dashboard-data';

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const AudienceTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  const name = String(first.name ?? '');

  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-3 shadow-sm',
        'bg-white/90 border-slate-200 text-slate-950',
        'dark:bg-slate-950/70 dark:border-slate-800 dark:text-slate-50',
        'backdrop-blur',
      )}
    >
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {name}
      </div>
      <div className="mt-1 text-sm font-semibold">
        {formatCompact(Number(first.value))}
      </div>
    </div>
  );
};

const ringColors = {
  male: 'var(--primary-main)',
  female: 'var(--secondary-main)',
  other: 'hsl(var(--muted-foreground))',
} as const;

export const AudienceCard = ({ segments }: { segments: DashboardAudienceSegment[] }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  const chartData = segments.map((s) => ({
    name: s.label,
    value: s.value,
    fill: ringColors[s.key],
  }));

  return (
    <Card
      className={cn(
        'rounded-3xl border shadow-sm',
        'bg-white/70 border-slate-200',
        'dark:bg-slate-950/40 dark:border-slate-800',
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
            Audience
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<AudienceTooltip />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="78%"
                paddingAngle={4}
                stroke="transparent"
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {formatCompact(total)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Total audience
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-3">
          {segments.map((s) => (
            <div
              key={s.key}
              className={cn(
                'rounded-2xl border px-3 py-2',
                'bg-white/60 border-slate-200',
                'dark:bg-slate-950/40 dark:border-slate-800',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: ringColors[s.key] }}
                  aria-hidden="true"
                />
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {s.label}
                </div>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">
                {formatCompact(s.value)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

