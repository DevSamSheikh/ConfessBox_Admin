import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, Check, Trash2, AlertTriangle, CheckSquare, Square } from 'lucide-react';
import * as React from 'react';
import { REPORT_RECORDS, PRIORITY_CLASS, REPORT_STATUS_CLASS } from '../constants/post-management.constants';
import type { ReportRecord } from '../types/post-management.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import { Badge } from '@/components/shared/ui/badge';
import { cn } from '@/lib/utils';
import { ReportDetailsDrawer } from './ReportDetailsDrawer';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

interface RecentReportsProps {
  onOpenDrawer?: () => void;
}

export const RecentReports = ({ onOpenDrawer }: RecentReportsProps) => {
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [selectedBulkAction, setSelectedBulkAction] = React.useState<string>('');
  const [reports, setReports] = React.useState<ReportRecord[]>(REPORT_RECORDS);
  const [selectedReport, setSelectedReport] = React.useState<ReportRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const total = reports.length;
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

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleSelectAll = () => {
    if (selectedIds.size === pageRows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pageRows.map((row) => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleRowClick = (row: ReportRecord) => {
    setSelectedReport(row);
    setDrawerOpen(true);
  };

  const handleBulkAction = () => {
    if (!selectedBulkAction) return;
    
    setReports((currentReports) =>
      currentReports.map((report) => {
        if (selectedIds.has(report.id)) {
          switch (selectedBulkAction) {
            case 'approve':
              return { ...report, status: 'Resolved' as const };
            case 'dismiss':
              return { ...report, status: 'Dismissed' as const };
            case 'warn':
              return { ...report, status: 'Reviewing' as const };
            case 'delete':
              return { ...report, status: 'Resolved' as const };
            default:
              return report;
          }
        }
        return report;
      })
    );
    
    setSelectedIds(new Set());
    setSelectedBulkAction('');
  };

  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-[var(--db-text-primary)]">
          Recent Reports
        </CardTitle>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-secondary)]"
                  >
                    Bulk Actions ({selectedIds.size})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('approve')}>
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('dismiss')}>
                    Dismiss
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('warn')}>
                    Warn User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('delete')}>
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="default"
                className="h-8 text-xs"
                onClick={handleBulkAction}
                disabled={!selectedBulkAction}
              >
                Apply
              </Button>
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--db-text-secondary)]">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--db-border-subtle)] hover:bg-transparent">
                <TableHead className="w-[40px] text-xs font-medium text-[var(--db-text-muted)]">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center justify-center"
                  >
                    {selectedIds.size === pageRows.length && pageRows.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-[var(--db-primary)]" />
                    ) : (
                      <Square className="h-4 w-4 text-[var(--db-text-secondary)]" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Report ID
                </TableHead>
                <TableHead className="min-w-[200px] text-xs font-medium text-[var(--db-text-muted)]">
                  Post Preview
                </TableHead>
                <TableHead className="min-w-[140px] text-xs font-medium text-[var(--db-text-muted)]">
                  Report Reason
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Count
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Category
                </TableHead>
                <TableHead className="min-w-[120px] text-xs font-medium text-[var(--db-text-muted)]">
                  Reported By
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Created
                </TableHead>
                <TableHead className="min-w-[80px] text-xs font-medium text-[var(--db-text-muted)]">
                  Priority
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Status
                </TableHead>
                <TableHead className="min-w-[80px] text-right text-xs font-medium text-[var(--db-text-muted)]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-[var(--db-border-subtle)] hover:bg-[var(--db-overlay-soft)]"
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell className="w-[40px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(row.id);
                      }}
                      className="flex items-center justify-center"
                    >
                      {selectedIds.has(row.id) ? (
                        <CheckSquare className="h-4 w-4 text-[var(--db-primary)]" />
                      ) : (
                        <Square className="h-4 w-4 text-[var(--db-text-secondary)]" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-[var(--db-text-primary)]">
                    {row.id}
                  </TableCell>
                  <TableCell className="min-w-[200px] max-w-xs">
                    <p className="line-clamp-2 text-sm text-[var(--db-text-secondary)]">
                      {row.postPreview}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-primary)]">
                    {row.reportReason}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-[var(--db-text-primary)]">
                    {row.reportCount}
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-secondary)]">
                    {row.category}
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-secondary)]">
                    {row.reportedBy}
                  </TableCell>
                  <TableCell className="text-xs text-[var(--db-text-secondary)]">
                    {row.createdAt}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('h-7 text-xs', PRIORITY_CLASS[row.priority])}>
                      {row.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('h-7 text-xs', REPORT_STATUS_CLASS[row.status])}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[var(--db-accent-red)]">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Post
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Dismiss Report
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[var(--db-accent-orange)]">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Warn User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {total > 0 && (
        <CardFooter className="flex-col gap-4 border-t border-[var(--db-border-subtle)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-[var(--db-text-muted)] sm:text-left">
            Showing{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">
              {showingFrom}–{showingTo}
            </span>{' '}
            of{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">{total}</span>
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--db-text-secondary)]">Rows per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 w-[88px] rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-2 text-xs text-[var(--db-text-secondary)]"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                onClick={goPrev}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-2 py-1 text-xs text-[var(--db-text-secondary)]">
                {page}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                onClick={goNext}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </CardFooter>
      )}
      <ReportDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        report={selectedReport}
      />
    </Card>
  );
};
