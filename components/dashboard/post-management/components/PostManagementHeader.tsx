'use client';

import * as React from 'react';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export const PostManagementHeader = () => {
  const [dateRange, setDateRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    if (range.from && range.to) {
      setIsCalendarOpen(false);
    }
  };

  const formatDateRange = () => {
    if (!dateRange.from) return 'Date Range';
    if (!dateRange.to) return format(dateRange.from, 'MMM dd, yyyy');
    return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
  };

  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[var(--db-text-primary)]">Post Management</h1>
            <p className="mt-1 text-sm text-[var(--db-text-secondary)]">
              Manage, monitor and moderate all confession posts, reports, trends and user activity.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 border-[var(--db-border-subtle)] bg-[var(--db-overlay-soft)] hover:bg-[var(--db-overlay-strong)]"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 border-[var(--db-border-subtle)] bg-[var(--db-overlay-soft)] hover:bg-[var(--db-overlay-strong)]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 border-[var(--db-border-subtle)] bg-[var(--db-overlay-soft)] hover:bg-[var(--db-overlay-strong)]"
                >
                  <Calendar className="h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--db-text-secondary)]">From Date</label>
                      <input
                        type="date"
                        value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const newDate = e.target.value ? new Date(e.target.value) : undefined;
                          handleDateRangeChange({ ...dateRange, from: newDate });
                        }}
                        className="mt-1 w-full rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-3 py-2 text-sm text-[var(--db-text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--db-text-secondary)]">To Date</label>
                      <input
                        type="date"
                        value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const newDate = e.target.value ? new Date(e.target.value) : undefined;
                          handleDateRangeChange({ ...dateRange, to: newDate });
                        }}
                        className="mt-1 w-full rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-3 py-2 text-sm text-[var(--db-text-primary)]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateRange({ from: undefined, to: undefined });
                          setIsCalendarOpen(false);
                        }}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setIsCalendarOpen(false)}
                        className="text-xs"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
