'use client';

import { format, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import * as React from 'react';

import {
  DASHBOARD_REPORT_CATEGORY_LABELS,
  type DashboardReport,
  type DashboardReportCategory,
} from '@/app/dashboard/dashboard-data';
import { Badge, type BadgeVariantName } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import { cn } from '@/lib/utils';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

const CATEGORY_BADGE_VARIANT: Record<DashboardReportCategory, BadgeVariantName> = {
  violation: 'destructiveMuted',
  false_information: 'warning',
  other: 'neutral',
};

function CategoryBadge({ category }: { category: DashboardReportCategory }) {
  const label = DASHBOARD_REPORT_CATEGORY_LABELS[category];

  return <Badge variant={CATEGORY_BADGE_VARIANT[category]}>{label}</Badge>;
}

function formatReportDate(iso: string) {
  try {
    return format(parseISO(iso), 'dd MMM yyyy · HH:mm');
  } catch {
    return iso;
  }
}

function getVisiblePages(
  current: number,
  total: number,
): Array<number | 'ellipsis'> {
  if (total <= 0) {
    return [];
  }
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) {
      pages.add(p);
    }
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: Array<number | 'ellipsis'> = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i];
    if (n === undefined) {
      continue;
    }
    if (i > 0) {
      const prev = sorted[i - 1];
      if (prev !== undefined && n - prev > 1) {
        out.push('ellipsis');
      }
    }
    out.push(n);
  }
  return out;
}

export const ReportsTable = ({ reports }: { reports: DashboardReport[] }) => {
  const total = reports.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const pageRows = reports.slice(start, start + pageSize);
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + pageSize, total);
  const visiblePages = getVisiblePages(page, totalPages);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <Card className="rounded-2xl border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] text-[var(--db-text-primary)] shadow-[var(--db-shadow-card)]">
      <CardHeader className="flex flex-col gap-4 space-y-0 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-overlay-soft)] text-primary-600 dark:text-primary-400"
            aria-hidden
          >
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg text-[var(--db-text-primary)]">Reports</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-[var(--db-text-secondary)]">{total}</span>{' '}
              {total === 1 ? 'report' : 'reports'} in queue
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span className="text-xs text-muted-foreground">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[88px]" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2 pt-0 sm:px-5">
        {/* Tablet+ : scrollable table; phones use cards */}
        <div className="-mx-1 hidden overflow-x-auto px-1 sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--db-border-subtle)] hover:bg-transparent">
              <TableHead className="min-w-[180px] whitespace-nowrap text-xs font-medium text-[var(--db-text-muted)]">
                User
              </TableHead>
              <TableHead className="min-w-[140px] whitespace-nowrap text-xs font-medium text-[var(--db-text-muted)]">
                Report category
              </TableHead>
              <TableHead className="min-w-[220px] text-xs font-medium text-[var(--db-text-muted)]">
                Report cause
              </TableHead>
              <TableHead className="min-w-[130px] whitespace-nowrap text-xs font-medium text-[var(--db-text-muted)]">
                Reported by
              </TableHead>
              <TableHead className="min-w-[160px] whitespace-nowrap text-right text-xs font-medium text-[var(--db-text-muted)]">
                Date &amp; time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((row) => (
              <TableRow
                key={row.id}
                className="border-[var(--db-border-subtle)] hover:bg-[var(--db-overlay-soft)]"
              >
                <TableCell className="align-top py-3">
                  <div className="font-medium text-[var(--db-text-primary)]">
                    {row.reportedUserName}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-[var(--db-text-muted)]">
                    {row.reportedUserId}
                  </div>
                </TableCell>
                <TableCell className="align-top py-3">
                  <CategoryBadge category={row.category} />
                </TableCell>
                <TableCell className="min-w-[12rem] max-w-md align-top py-3">
                  <p className="line-clamp-2 text-sm leading-snug text-[var(--db-text-secondary)]">
                    {row.cause}
                  </p>
                </TableCell>
                <TableCell className="align-top py-3 text-sm text-[var(--db-text-secondary)]">
                  {row.reportedByName}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 text-right text-sm tabular-nums text-[var(--db-text-secondary)]">
                  {formatReportDate(row.reportedAtIso)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>

        {/* Mobile: stacked cards */}
        <ul className="space-y-3 sm:hidden">
          {pageRows.map((row) => (
            <li key={row.id}>
              <Card className="border-[var(--db-border-subtle)] bg-card/95 bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-grad-to)] shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-[var(--db-text-primary)]">
                        {row.reportedUserName}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-[var(--db-text-muted)]">
                        {row.reportedUserId}
                      </div>
                    </div>
                    <CategoryBadge category={row.category} />
                  </div>
                  <p className="mt-3 text-sm leading-snug text-[var(--db-text-secondary)]">
                    {row.cause}
                  </p>
                  <div className="mt-3 flex flex-col gap-1 border-t border-[var(--db-border-subtle)] pt-3 text-xs">
                    <span className="text-[var(--db-text-muted)]">
                      Reported by{' '}
                      <span className="font-medium text-[var(--db-text-secondary)]">
                        {row.reportedByName}
                      </span>
                    </span>
                    <time
                      className="tabular-nums text-[var(--db-text-secondary)]"
                      dateTime={row.reportedAtIso}
                    >
                      {formatReportDate(row.reportedAtIso)}
                    </time>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        {total === 0 && (
          <p className="text-center text-sm text-muted-foreground">No reports to show.</p>
        )}
      </CardContent>

      {total > 0 && (
        <CardFooter className="flex-col gap-4 border-t border-[var(--db-border-subtle)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Showing{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">
              {showingFrom}–{showingTo}
            </span>{' '}
            of{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">{total}</span>
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-1"
            aria-label="Report list pagination"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={goPrev}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {visiblePages.map((item, idx) =>
              item === 'ellipsis' ? (
                <span
                  key={`e-${idx}`}
                  className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <Button
                  key={item}
                  type="button"
                  variant={item === page ? 'default' : 'outline'}
                  size="sm"
                  className={cn('h-9 min-w-9 px-2', item === page && 'shadow-sm')}
                  onClick={() => setPage(item)}
                  aria-label={`Page ${item}`}
                  aria-current={item === page ? 'page' : undefined}
                >
                  {item}
                </Button>
              ),
            )}

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={goNext}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </CardFooter>
      )}
    </Card>
  );
};
