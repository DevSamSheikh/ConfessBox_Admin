'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

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

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: string;
  trendColor?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export const MetricCard = ({
  title,
  value,
  trend,
  trendColor = 'var(--db-accent-emerald)',
  icon: Icon,
  iconColor = 'var(--db-text-primary)',
  iconBg = 'var(--db-overlay-strong)',
}: MetricCardProps) => {
  const displayValue = typeof value === 'number' ? <AnimatedCounter value={value} /> : value;

  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">{title}</CardTitle>
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
              <Icon className="h-4 w-4" style={{ color: iconColor }} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">{displayValue}</p>
        {trend && <p className="mt-1 text-xs" style={{ color: trendColor }}>{trend}</p>}
      </CardContent>
    </Card>
  );
};
