'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Flame } from 'lucide-react';
import { POST_HASHTAGS } from '../constants/post-management.constants';
import type { HashTagStat } from '../types/post-management.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { cn } from '@/lib/utils';

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const HashTagTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  return (
    <div className="rounded-2xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] px-4 py-3">
      <div className="text-xs text-[var(--db-text-muted)]">{String(first.payload?.tag ?? '')}</div>
      <div className="text-sm font-semibold text-[var(--db-text-primary)]">
        {formatCompact(Number(first.value))}
      </div>
      <div className="text-xs text-[var(--db-text-secondary)]">{first.payload?.percentage}%</div>
    </div>
  );
};

const HashTagCard = ({ hashtag }: { hashtag: HashTagStat }) => {
  const data = [
    { name: hashtag.tag, value: hashtag.usageCount, fill: hashtag.color },
    { name: 'Other', value: 100 - hashtag.percentage, fill: 'var(--db-overlay-soft)' },
  ];

  return (
    <Card
      className="group cursor-pointer rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4 transition-all hover:shadow-lg hover:border-[var(--db-border-soft)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[var(--db-text-primary)]">{hashtag.tag}</h3>
            {hashtag.trending && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--db-accent-orange)_20%,transparent)]">
                <Flame className="h-3 w-3 text-[var(--db-accent-orange)]" />
              </div>
            )}
          </div>
          <p className="mt-1 text-2xl font-bold text-[var(--db-text-primary)]">
            {formatCompact(hashtag.usageCount)}
          </p>
          <p className="mt-1 text-xs text-[var(--db-text-secondary)]">{hashtag.percentage}% of total</p>
        </div>
        <div className="h-16 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<HashTagTooltip />} wrapperStyle={{ zIndex: 99999 }} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={0}
                cornerRadius={8}
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <TrendingUp className="h-3 w-3 text-[var(--db-accent-emerald)]" />
        <span className="text-xs font-medium text-[var(--db-accent-emerald)]">Trending</span>
      </div>
    </Card>
  );
};

export const TopHashTags = () => {
  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-[var(--db-text-primary)]">
          Top Hash Tags
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--db-text-secondary)]">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {POST_HASHTAGS.map((hashtag) => (
            <HashTagCard key={hashtag.tag} hashtag={hashtag} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
