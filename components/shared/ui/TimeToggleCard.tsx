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

interface TimeToggleCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  toggles: string[];
  values: Record<string, number>;
  autoRotate?: boolean;
  rotationInterval?: number;
}

export const TimeToggleCard = ({
  title,
  icon: Icon,
  iconColor = 'var(--db-accent-emerald)',
  iconBg = 'color-mix(in_srgb,var(--db-accent-emerald)_20%,transparent)',
  toggles,
  values,
  autoRotate = true,
  rotationInterval = 5000,
}: TimeToggleCardProps) => {
  const [currentToggle, setCurrentToggle] = React.useState(toggles[0]);
  const [currentValue, setCurrentValue] = React.useState(values[toggles[0]]);

  const handleToggle = () => {
    const currentIndex = toggles.indexOf(currentToggle);
    const nextIndex = (currentIndex + 1) % toggles.length;
    setCurrentToggle(toggles[nextIndex]);
    setCurrentValue(values[toggles[nextIndex]]);
  };

  React.useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      handleToggle();
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [currentToggle, autoRotate, rotationInterval]);

  return (
    <Card
      className="cursor-pointer rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm transition-all hover:shadow-lg"
      onClick={handleToggle}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">{title}</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
            <Icon className="h-4 w-4" style={{ color: iconColor }} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">
          <AnimatedCounter value={currentValue} />
        </p>
        <p className="mt-1 text-xs text-[var(--db-text-secondary)]">{currentToggle}</p>
      </CardContent>
    </Card>
  );
};
