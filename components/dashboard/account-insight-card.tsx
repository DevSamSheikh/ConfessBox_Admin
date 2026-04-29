'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/shared/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { cn } from '@/lib/utils';
import type {
  DashboardTrendMetric,
  DashboardTrendPoint,
} from '@/app/dashboard/dashboard-data';

const metricTabs: Array<{ key: DashboardTrendMetric; label: string }> = [
  { key: 'followers', label: 'Follower' },
  { key: 'following', label: 'Following' },
  { key: 'likes', label: 'Like' },
  { key: 'comments', label: 'Comment' },
];

const rangeOptions = [
  { value: 'months', label: 'Months' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'days', label: 'Days' },
] as const;

type RangeValue = (typeof rangeOptions)[number]['value'];

const formatAxisCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const tooltipValueFormatter = (value: number) =>
  Intl.NumberFormat('en').format(value);

const TrendTooltip = ({
  active,
  label,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const first = payload[0];

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
        {String(label)}
      </div>
      <div className="mt-1 text-sm font-semibold">
        {tooltipValueFormatter(Number(first.value))}
      </div>
    </div>
  );
};

export const AccountInsightCard = ({ data }: { data: DashboardTrendPoint[] }) => {
  const [metric, setMetric] = useState<DashboardTrendMetric>('followers');
  const [range, setRange] = useState<RangeValue>('months');

  const accent = useMemo(() => {
    if (metric === 'following' || metric === 'comments') return 'var(--secondary-main)';
    return 'var(--primary-main)';
  }, [metric]);

  return (
    <Card
      className={cn(
        'rounded-3xl border shadow-sm',
        'bg-white/70 border-slate-200',
        'dark:bg-slate-950/40 dark:border-slate-800',
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Account Insight
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Your followers are up this month compared to last month.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={range} onValueChange={(v) => setRange(v as RangeValue)}>
              <SelectTrigger className="h-10 w-32 rounded-2xl">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent>
                {rangeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={metric} onValueChange={(v) => setMetric(v as DashboardTrendMetric)}>
          <TabsList className="h-11 w-full justify-start gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900/40">
            {metricTabs.map((t) => (
              <TabsTrigger
                key={t.key}
                value={t.key}
                className={cn(
                  'h-9 rounded-2xl px-4',
                  'data-[state=active]:bg-white data-[state=active]:text-slate-950',
                  'dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50',
                )}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={metric} className="mt-4">
            <CardContent className="p-0">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'currentColor' }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'currentColor' }}
                      tickFormatter={formatAxisCompact}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <Tooltip
                      cursor={{ stroke: 'currentColor', opacity: 0.2 }}
                      content={<TrendTooltip />}
                    />
                    <Line
                      type="monotone"
                      dataKey={metric}
                      stroke={accent}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

