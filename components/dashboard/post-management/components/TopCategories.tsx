'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { POST_CATEGORIES } from '../constants/post-management.constants';
import type { CategoryStat } from '../types/post-management.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { cn } from '@/lib/utils';

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const CategoryTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  return (
    <div className="rounded-2xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] px-4 py-3">
      <div className="text-xs text-[var(--db-text-muted)]">{String(first.payload?.name ?? '')}</div>
      <div className="text-sm font-semibold text-[var(--db-text-primary)]">
        {formatCompact(Number(first.value))}
      </div>
      <div className="text-xs text-[var(--db-text-secondary)]">{first.payload?.percentage}%</div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: CategoryStat }) => {
  const data = [
    { name: category.name, value: category.totalPosts, fill: category.color },
    { name: 'Other', value: 100 - category.percentage, fill: 'var(--db-overlay-soft)' },
  ];

  return (
    <Card
      className="group cursor-pointer rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4 transition-all hover:shadow-lg hover:border-[var(--db-border-soft)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[var(--db-text-primary)]">{category.name}</h3>
          <p className="mt-1 text-2xl font-bold text-[var(--db-text-primary)]">
            {formatCompact(category.totalPosts)}
          </p>
          <p className="mt-1 text-xs text-[var(--db-text-secondary)]">{category.percentage}% of total</p>
        </div>
        <div className="h-16 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CategoryTooltip />} wrapperStyle={{ zIndex: 99999 }} />
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
        {category.growth >= 0 ? (
          <TrendingUp className="h-3 w-3 text-[var(--db-accent-emerald)]" />
        ) : (
          <TrendingDown className="h-3 w-3 text-[var(--db-accent-red)]" />
        )}
        <span
          className={cn(
            'text-xs font-medium',
            category.growth >= 0 ? 'text-[var(--db-accent-emerald)]' : 'text-[var(--db-accent-red)]',
          )}
        >
          {category.growth >= 0 ? '+' : ''}
          {category.growth}%
        </span>
      </div>
    </Card>
  );
};

export const TopCategories = () => {
  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-[var(--db-text-primary)]">
          Top Categories
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--db-text-secondary)]">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {POST_CATEGORIES.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
