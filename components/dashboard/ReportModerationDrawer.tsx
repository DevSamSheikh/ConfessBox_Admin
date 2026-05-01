'use client';

/**
 * Super-admin moderation surface: Shadcn **Sheet** (right rail) is the standard
 * pattern for this layout; the repo’s Vaul **Drawer** primitive is bottom-sheet oriented.
 */

import { format, parseISO } from 'date-fns';
import { MoreHorizontal, X } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import type { ModerationReportDetail } from '@/app/dashboard/moderation-report-detail';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/shared/ui/sheet';
import { Separator } from '@/components/shared/ui/separator';
import { cn } from '@/lib/utils';

type ReportModerationDrawerProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  detail: ModerationReportDetail | null;
};

function formatDt(iso: string) {
  try {
    return format(parseISO(iso), 'dd MMM yyyy · HH:mm');
  } catch {
    return iso;
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: ModerationReportDetail['report']['status'] }) {
  if (status === 'pending') {
    return <Badge variant="warning">Pending</Badge>;
  }
  if (status === 'reviewed') {
    return <Badge variant="neutral">Reviewed</Badge>;
  }
  return <Badge variant="destructiveMuted">Rejected</Badge>;
}

function TypeBadge({ type }: { type: ModerationReportDetail['report']['type'] }) {
  if (type === 'post') {
    return <Badge variant="default">Post</Badge>;
  }
  if (type === 'comment') {
    return <Badge variant="secondary">Comment</Badge>;
  }
  return <Badge variant="outline">Profile</Badge>;
}

function AccountStatusBadge({
  status,
}: {
  status: ModerationReportDetail['user']['status'];
}) {
  if (status === 'active') {
    return (
      <Badge
        variant="outline"
        className="border-success/40 bg-success/10 text-success hover:bg-success/15"
      >
        Active
      </Badge>
    );
  }
  if (status === 'warned') {
    return <Badge variant="warning">Warned</Badge>;
  }
  return <Badge variant="destructiveMuted">Suspended</Badge>;
}

function ReportedContentSection({ detail }: { detail: ModerationReportDetail }) {
  const { content } = detail;

  if (content.kind === 'post') {
    return (
      <Card className="border-border bg-muted/30 shadow-none">
        <CardHeader className="space-y-3 pb-3 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs">{content.authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold">{content.authorDisplayName}</CardTitle>
              <p className="text-xs text-muted-foreground">Reported post</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4 pt-0">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {content.postText}
          </p>
          {content.mediaSlotCount > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Media preview
              </p>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(content.mediaSlotCount, 3)}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: content.mediaSlotCount }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-md border border-border bg-muted"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>Likes {content.likes}</span>
            <span>Comments {content.comments}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (content.kind === 'comment') {
    return (
      <Card className="border-border bg-muted/30 shadow-none">
        <CardHeader className="space-y-3 pb-3 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs">{content.authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold">{content.authorDisplayName}</CardTitle>
              <p className="text-xs text-muted-foreground">Reported comment</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4 pt-0">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {content.commentText}
          </p>
          <div className="rounded-md border border-border bg-background/80 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Context post
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{content.contextPostExcerpt}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-muted/30 shadow-none">
      <CardHeader className="space-y-3 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-xs">{content.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold">{content.displayName}</CardTitle>
            <p className="text-xs text-muted-foreground">Reported profile</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-4 pt-0">
        <Field label="Bio">{content.bioSnippet}</Field>
        <Field label="Account">{content.accountPreview}</Field>
      </CardContent>
    </Card>
  );
}

export const ReportModerationDrawer = ({
  open,
  onOpenChangeAction,
  detail,
}: ReportModerationDrawerProps) => {
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null);
  const isTopPostDrawer = detail?.report.reportId.startsWith('#TP-') ?? false;

  const runAction = React.useCallback(async (key: string, message: string) => {
    setLoadingKey(key);
    try {
      await new Promise((r) => setTimeout(r, 850));
      toast.success(message);
    } catch {
      toast.error('Action failed. Try again.');
    } finally {
      setLoadingKey(null);
    }
  }, []);

  const busy = loadingKey !== null;

  return (
    <Sheet open={open && detail !== null} onOpenChange={onOpenChangeAction}>
      <SheetContent
        side="right"
        hideClose
        className={cn(
          'flex h-full w-full max-w-full flex-col gap-0 overflow-hidden border-l border-border bg-background p-0 shadow-none sm:max-w-[480px]',
          isTopPostDrawer &&
            'border-[var(--db-border-subtle)] bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-bg)] text-[var(--db-text-primary)]',
        )}
      >
        {detail && (
          <>
            <SheetTitle className="sr-only">
              Moderation report {detail.report.reportId}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Review reported content and take moderation actions.
            </SheetDescription>

            {/* Sticky header */}
            <header
              className={cn(
                'sticky top-0 z-20 flex shrink-0 flex-col gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-5',
                isTopPostDrawer &&
                  'border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]/95 text-[var(--db-text-primary)]',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-2">
                  <p className="truncate font-mono text-sm font-semibold tracking-tight text-foreground">
                    {detail.report.reportId}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={detail.report.status} />
                    <TypeBadge type={detail.report.type} />
                  </div>
                </div>
                <SheetClose asChild>
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
            </header>

            {/* Scroll body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-6">
                <section>
                  <h3
                    className={cn(
                      'mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                      isTopPostDrawer && 'text-[var(--db-text-muted)]',
                    )}
                  >
                    Report summary
                  </h3>
                  <Card
                    className={cn(
                      'border-border shadow-none',
                      isTopPostDrawer &&
                        'border-[var(--db-border-subtle)] bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-bg)]',
                    )}
                  >
                    <CardContent className="grid gap-4 p-4">
                      <Field label="Reason">{detail.report.reason}</Field>
                      <Separator />
                      <Field label="Description">
                        <span className="whitespace-pre-wrap">{detail.report.description}</span>
                      </Field>
                      <Separator />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Timestamp">{formatDt(detail.report.timestamp)}</Field>
                        <Field label="Report count">{detail.report.reportCount}</Field>
                      </div>
                      <Field label="Reported by">{detail.report.reportedByName}</Field>
                    </CardContent>
                  </Card>
                </section>

                <section>
                  <h3
                    className={cn(
                      'mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                      isTopPostDrawer && 'text-[var(--db-text-muted)]',
                    )}
                  >
                    Reported content
                  </h3>
                  <ReportedContentSection detail={detail} />
                </section>

                <section>
                  <h3
                    className={cn(
                      'mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                      isTopPostDrawer && 'text-[var(--db-text-muted)]',
                    )}
                  >
                    User info
                  </h3>
                  <Card
                    className={cn(
                      'border-border shadow-none',
                      isTopPostDrawer &&
                        'border-[var(--db-border-subtle)] bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-bg)]',
                    )}
                  >
                    <CardContent className="space-y-4 p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11">
                          {detail.user.avatarUrl ? (
                            <AvatarImage src={detail.user.avatarUrl} alt={detail.user.username} />
                          ) : null}
                          <AvatarFallback>{detail.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">{detail.user.username}</p>
                          <p className="truncate font-mono text-xs text-muted-foreground">
                            {detail.user.userId}
                          </p>
                        </div>
                        <AccountStatusBadge status={detail.user.status} />
                      </div>
                      <Separator />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Total violations">{detail.user.violations}</Field>
                        <Field label="Join date">{formatDt(detail.user.joinedAt)}</Field>
                        <Field label="Last activity">{formatDt(detail.user.lastActive)}</Field>
                        {detail.user.deviceIp ? (
                          <Field label="Device / IP (admin)">{detail.user.deviceIp}</Field>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </div>

            {/* Sticky actions */}
            <footer
              className={cn(
                'sticky bottom-0 z-20 shrink-0 border-t border-border bg-background/85 px-4 py-3 backdrop-blur-md sm:px-5',
                isTopPostDrawer &&
                  'border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]/90',
              )}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className={cn(
                      'w-full sm:w-auto',
                      isTopPostDrawer &&
                        'border-transparent bg-[var(--db-accent-orange)] text-[var(--db-text-primary)] hover:bg-[var(--db-accent-orange)]/90',
                    )}
                    disabled={busy}
                    onClick={() =>
                      runAction('remove', 'Content removal queued. Report will close when done.')
                    }
                  >
                    {loadingKey === 'remove' ? 'Working…' : 'Remove content'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      'w-full border-warning/45 text-warning-foreground hover:bg-warning/10 sm:w-auto',
                      isTopPostDrawer &&
                        'border-[var(--db-border-soft)] text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]',
                    )}
                    disabled={busy}
                    onClick={() => runAction('warn', 'Warning sent to user.')}
                  >
                    {loadingKey === 'warn' ? 'Working…' : 'Warn user'}
                  </Button>
                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    className={cn(
                      'w-full sm:w-auto',
                      isTopPostDrawer &&
                        'border-transparent bg-[var(--db-primary)] text-[var(--db-text-primary)] hover:bg-[var(--db-primary-hover)]',
                    )}
                    disabled={busy}
                    onClick={() =>
                      runAction('safe', 'Report marked safe and closed without further action.')
                    }
                  >
                    {loadingKey === 'safe' ? 'Working…' : 'Mark safe'}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={cn(
                          'w-full gap-1 sm:ml-auto sm:w-auto',
                          isTopPostDrawer &&
                            'border-[var(--db-border-soft)] text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-text-primary)]',
                        )}
                        disabled={busy}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        More
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => runAction('suspend', 'User suspension initiated.')}
                      >
                        Suspend user
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => runAction('shadow', 'Shadowban applied to user.')}
                      >
                        Shadowban user
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => runAction('escalate', 'Report escalated to senior admin.')}
                      >
                        Escalate report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
