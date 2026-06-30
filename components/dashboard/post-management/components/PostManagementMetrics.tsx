'use client';

import * as React from 'react';
import { FileText, AlertTriangle, Trash2, TrendingUp, Plus } from 'lucide-react';
import { POST_METRICS } from '../constants/post-management.constants';
import type { TimeToggle } from '../types/post-management.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const TimeToggleCard = () => {
  const [currentToggle, setCurrentToggle] = React.useState<TimeToggle>('Today');
  const [postsCreated, setPostsCreated] = React.useState(POST_METRICS.postsCreated);

  const toggles: TimeToggle[] = ['Today', 'This Hour', 'This Week', 'This Month', 'This Year'];
  const values: Record<TimeToggle, number> = {
    Today: 187,
    'This Hour': 12,
    'This Week': 1243,
    'This Month': 5420,
    'This Year': 44500,
  };

  const handleToggle = () => {
    const currentIndex = toggles.indexOf(currentToggle);
    const nextIndex = (currentIndex + 1) % toggles.length;
    setCurrentToggle(toggles[nextIndex]);
    setPostsCreated(values[toggles[nextIndex]]);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleToggle();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentToggle]);

  return (
    <Card
      className="cursor-pointer rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm transition-all hover:shadow-lg"
      onClick={handleToggle}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">Posts Created</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--db-accent-emerald)_20%,transparent)]">
            <Plus className="h-4 w-4 text-[var(--db-accent-emerald)]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">
          <AnimatedCounter value={postsCreated} />
        </p>
        <p className="mt-1 text-xs text-[var(--db-text-secondary)]">{currentToggle}</p>
      </CardContent>
    </Card>
  );
};

export const PostManagementMetrics = () => {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">Total Posts</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--db-overlay-strong)]">
              <FileText className="h-4 w-4 text-[var(--db-text-primary)]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">
            <AnimatedCounter value={POST_METRICS.totalPosts} />
          </p>
          <p className="mt-1 text-xs text-[var(--db-accent-emerald)]">+{POST_METRICS.growthPercentage}% vs last month</p>
        </CardContent>
      </Card>

      <TimeToggleCard />

      <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">Reported Posts</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--db-accent-orange)_20%,transparent)]">
              <AlertTriangle className="h-4 w-4 text-[var(--db-accent-orange)]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">
            <AnimatedCounter value={POST_METRICS.reportedPosts} />
          </p>
          <p className="mt-1 text-xs text-[var(--db-accent-orange)]">{POST_METRICS.needsReviewPercentage}% needs review</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">Deleted Posts</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--db-accent-red)_20%,transparent)]">
              <Trash2 className="h-4 w-4 text-[var(--db-accent-red)]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">
            <AnimatedCounter value={POST_METRICS.deletedPosts} />
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--db-text-secondary)]">
            <TrendingUp className="h-3 w-3 text-[var(--db-accent-red)]" />
            <span>Mini trend graph</span>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
