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
import { Card } from '@/components/shared/ui/card';
import {
  Tabs,
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
    <div className="rounded-2xl border border-white/10 bg-[#12101F] px-4 py-3">
      <div className="text-gray-500 text-xs">{String(label)}</div>
      <div className="text-white font-semibold text-sm">
        {tooltipValueFormatter(Number(first.value))}
      </div>
    </div>
  );
};

export const LineChartCard = ({ data }: { data: DashboardTrendPoint[] }) => {
  const [metric, setMetric] = useState<DashboardTrendMetric>('followers');
  const [range, setRange] = useState<RangeValue>('months');

  const accent = useMemo(() => {
    if (metric === 'following' || metric === 'comments') return '#7A3BFF';
    return '#2F6BFF';
  }, [metric]);

  return (
    <Card className="p-5 rounded-2xl bg-[#12101F] border border-white/10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-white text-lg font-semibold">Account Insight</div>
          <div className="text-gray-400 text-sm">
            Your followers is 30% higher compare to last month
          </div>
        </div>

        <Select value={range} onValueChange={(v) => setRange(v as RangeValue)}>
          <SelectTrigger className="h-9 w-28 rounded-xl bg-[#171526] border-white/10 text-white">
            <SelectValue placeholder="Months" />
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

      <div className="mt-4 flex items-center justify-between">
        <Tabs value={metric} onValueChange={(v) => setMetric(v as DashboardTrendMetric)}>
          <TabsList className="bg-[#171526] border border-white/10 rounded-xl p-1 h-10">
            {metricTabs.map((t) => (
              <TabsTrigger
                key={t.key}
                value={t.key}
                className={cn(
                  'h-8 rounded-lg px-4 text-sm text-gray-400',
                  'data-[state=active]:bg-blue-600/30 data-[state=active]:text-white',
                )}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(156,163,175,0.9)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatAxisCompact}
              tick={{ fill: 'rgba(156,163,175,0.9)', fontSize: 12 }}
            />
            <Tooltip content={<TrendTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.12)' }} />
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
    </Card>
  );
};

