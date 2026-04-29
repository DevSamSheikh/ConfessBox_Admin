'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipProps } from 'recharts';
import { Card } from '@/components/shared/ui/card';
import type { DashboardAudienceSegment } from '@/app/dashboard/dashboard-data';

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const AudienceTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#12101F] px-4 py-3">
      <div className="text-gray-500 text-xs">{String(first.name ?? '')}</div>
      <div className="text-white font-semibold text-sm">
        {formatCompact(Number(first.value))}
      </div>
    </div>
  );
};

export const DonutChartCard = ({ segments }: { segments: DashboardAudienceSegment[] }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const data = segments.map((s) => ({
    name: s.label,
    value: s.value,
    fill:
      s.key === 'male'
        ? '#2F6BFF'
        : s.key === 'female'
          ? '#7A3BFF'
          : 'rgba(156,163,175,0.6)',
  }));
  const withPercent = data.map((item) => ({
    ...item,
    percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));

  return (
    <Card className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#12101F] p-5">
      <div className="text-white text-lg font-semibold">Audience</div>

      <div className="relative mt-4 h-[250px] flex-1 sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<AudienceTooltip />} />
            <Pie
              data={withPercent}
              dataKey="value"
              nameKey="name"
              innerRadius="66%"
              outerRadius="85%"
              paddingAngle={5}
              cornerRadius={10}
              strokeWidth={0}
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, percent }) => {
                const radius = Number(outerRadius) + 14;
                const x = Number(cx) + radius * Math.cos((-Number(midAngle) * Math.PI) / 180);
                const y = Number(cy) + radius * Math.sin((-Number(midAngle) * Math.PI) / 180);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#A3A7B3"
                    textAnchor={x > Number(cx) ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={10}
                  >
                    {Math.round(Number(percent) * 100)}%
                  </text>
                );
              }}
            >
              {withPercent.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-semibold text-white tabular-nums">
            {formatCompact(total)}
          </div>
          <div className="text-xs text-gray-400 sm:text-sm">Total Audience</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-gray-400">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  s.key === 'male'
                    ? '#2F6BFF'
                    : s.key === 'female'
                      ? '#7A3BFF'
                      : 'rgba(156,163,175,0.6)',
              }}
            />
            <span>{s.label}</span>
            <span className="tabular-nums text-gray-500">{formatCompact(s.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

