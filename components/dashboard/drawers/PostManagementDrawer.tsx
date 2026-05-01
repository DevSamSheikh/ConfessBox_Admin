'use client';

import * as React from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Scan,
  Share2,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Input } from '@/components/shared/ui/input';
import { Separator } from '@/components/shared/ui/separator';
import { SheetClose } from '@/components/shared/ui/sheet';
import { Textarea } from '@/components/shared/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shared/ui/tooltip';
import { cn } from '@/lib/utils';
import { GenericDrawerShell } from '@/components/dashboard/drawers/GenericDrawerShell';

type PostManagementDrawerProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  post: DashboardTopPost | null;
};

type PostManagementModel = {
  postId: string;
  status: 'pending_review' | 'approved' | 'rejected';
  createdLabel: string;
  createdAtLabel: string;
  platform: string;
  user: {
    name: string;
    handle: string;
    userId: string;
    accountAge: string;
    trustScore: number;
    followers: string;
    posts: string;
    deviceId: string;
    region: string;
    linkedAccounts: string[];
  };
  content: {
    heading: string;
    body: string;
    tags: string[];
    language: string;
    toxicity: number;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
  };
  insights: {
    reports: number;
    topReasons: string[];
    aiFlags: string[];
    severity: 'Low' | 'Medium' | 'High';
    confidence: number;
  };
  history: Array<{
    time: string;
    title: string;
    actor: string;
    note: string;
    tone: 'neutral' | 'warning' | 'danger';
  }>;
  metrics: Array<{ label: string; value: string; icon: React.ReactNode }>;
  commentsPreview: Array<{ author: string; text: string; flagged?: boolean }>;
  notes: Array<{ author: string; at: string; text: string }>;
};

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

const initialsFromName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
};

const toPostManagementModel = (post: DashboardTopPost): PostManagementModel => {
  const numericId = Number.parseInt(post.id.replace(/\D/g, ''), 10) || 1;
  const toxicity = 48 + (numericId % 45);
  const severity: PostManagementModel['insights']['severity'] =
    toxicity >= 75 ? 'High' : toxicity >= 60 ? 'Medium' : 'Low';
  const sentiment: PostManagementModel['content']['sentiment'] =
    numericId % 3 === 0 ? 'Negative' : numericId % 2 === 0 ? 'Neutral' : 'Positive';

  return {
    postId: `#${(84560 + numericId).toString()}`,
    status: 'pending_review',
    createdLabel: post.postedAtLabel,
    createdAtLabel: 'May 16, 2025 10:24 AM',
    platform: 'Web',
    user: {
      name: post.authorName,
      handle: post.authorHandle,
      userId: `8f7a2c${numericId}`,
      accountAge: `${6 + (numericId % 6)} months`,
      trustScore: 28 + (numericId % 58),
      followers: formatCompact(900 + post.views / 50),
      posts: String(24 + (numericId % 40)),
      deviceId: `df13...9a2${numericId}`,
      region: 'India',
      linkedAccounts: ['Google', 'Apple', '+1'],
    },
    content: {
      heading: post.heading,
      body: post.content,
      tags: ['consistency', 'growth', 'mindset', 'success', 'dailyimprovement'],
      language: 'English',
      toxicity,
      sentiment,
    },
    insights: {
      reports: 3 + (numericId % 5),
      topReasons: ['Spam', 'Irrelevant', 'Misinformation'],
      aiFlags: ['Low toxicity 12%', 'Offensive language 8%'],
      severity,
      confidence: 84 + (numericId % 12),
    },
    history: [
      {
        time: 'May 16, 2025 10:20 AM',
        title: 'Auto-flagged by AI',
        actor: 'AI System',
        note: 'Low-quality content pattern detected.',
        tone: 'warning',
      },
      {
        time: 'May 16, 2025 10:25 AM',
        title: 'Reported by user',
        actor: '5 reports',
        note: 'Top reason: Spam',
        tone: 'danger',
      },
      {
        time: 'May 16, 2025 10:28 AM',
        title: 'Under review',
        actor: 'Admin: Sarah K.',
        note: 'Investigating content',
        tone: 'neutral',
      },
    ],
    metrics: [
      { label: 'Likes', value: formatCompact(post.interactions), icon: <Heart className="h-3.5 w-3.5" /> },
      { label: 'Comments', value: formatCompact(post.comments), icon: <MessageCircle className="h-3.5 w-3.5" /> },
      { label: 'Shares', value: formatCompact(post.shares), icon: <Share2 className="h-3.5 w-3.5" /> },
      { label: 'Reach', value: formatCompact(post.views), icon: <Globe className="h-3.5 w-3.5" /> },
    ],
    commentsPreview: [
      { author: 'Cody Fisher', text: 'Strong message, but can you add more context?' },
      { author: 'Leslie Alexander', text: 'This feels repetitive. Might be low-effort.', flagged: true },
    ],
    notes: [
      {
        author: 'Sarah K.',
        at: 'May 16, 2025 10:30 AM',
        text: 'Check for policy violation - spam pattern similar to post #84211.',
      },
    ],
  };
};

type PostDrawerView = 'details' | 'likes' | 'comments' | 'shares' | 'reach';

const SectionCard = ({
  title,
  children,
  rightAction,
}: {
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}) => (
  <Card className="rounded-xl border border-border bg-muted/30 shadow-none">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
      <CardTitle className="text-sm font-semibold text-foreground">
        {title}
      </CardTitle>
      {rightAction}
    </CardHeader>
    <CardContent className="p-4 pt-0">{children}</CardContent>
  </Card>
);

const ListShell = ({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) => (
  <div className="space-y-3 px-4 py-4 sm:px-5">
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        onClick={onBack}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back
      </Button>
      <p className="text-sm font-semibold text-foreground">{title}</p>
    </div>
    <SectionCard title={title}>{children}</SectionCard>
  </div>
);

const MetricBox = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg border border-border bg-background/80 px-3 py-2">
    <p className="text-[11px] text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
  </div>
);

const ToneDot = ({ tone }: { tone: 'neutral' | 'warning' | 'danger' }) => {
  const className =
    tone === 'danger'
      ? 'bg-[var(--db-accent-red)]'
      : tone === 'warning'
        ? 'bg-[var(--db-accent-orange)]'
        : 'bg-[var(--db-primary)]';
  return <span className={cn('mt-1.5 h-2.5 w-2.5 rounded-full', className)} aria-hidden />;
};

const themedOutlineButtonClass =
  'border-border bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground';

const themedPrimaryButtonClass = 'border-border bg-background text-foreground hover:bg-muted/40';

const themedSuccessButtonClass = 'border border-transparent bg-success text-success-foreground hover:bg-success/90';

const themedDangerButtonClass =
  'border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90';

export const PostManagementDrawer = ({
  open,
  onOpenChangeAction,
  post,
}: PostManagementDrawerProps) => {
  const [loadingAction, setLoadingAction] = React.useState<string | null>(null);
  const [noteInput, setNoteInput] = React.useState('');
  const [view, setView] = React.useState<PostDrawerView>('details');

  const model = React.useMemo(() => (post ? toPostManagementModel(post) : null), [post]);

  const pseudoUsers = React.useMemo(() => {
    if (!post) {
      return [];
    }
    const numericId = Number.parseInt(post.id.replace(/\D/g, ''), 10) || 1;
    const base = [
      'Alex Morgan',
      'Jordan Lee',
      'Sam Taylor',
      'Riley Quinn',
      'Casey Park',
      'Avery Singh',
      'Jamie Chen',
      'Taylor Kim',
      'Drew Patel',
      'Reese Carter',
      'Quinn Rivera',
      'Morgan Scott',
    ] as const;

    return base.map((name, idx) => {
      const handle = `@${name.toLowerCase().replace(/\s+/g, '')}${(idx + 3) % 9}`;
      return {
        id: `usr_${idx}_${(84560 + numericId).toString()}`,
        name,
        handle,
        when: `${(idx % 6) + 1}h ago`,
      };
    });
  }, [post]);

  React.useEffect(() => {
    if (!open || post === null) {
      setView('details');
      setNoteInput('');
    }
  }, [open, post]);

  const runAction = React.useCallback(async (key: string, message: string) => {
    setLoadingAction(key);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      toast.success(message);
    } catch {
      toast.error('Action failed. Try again.');
    } finally {
      setLoadingAction(null);
    }
  }, []);

  if (!model) {
    return null;
  }

  const header = (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm font-semibold text-foreground">
              Post {model.postId}
            </p>
            <Badge variant="warning">Pending Review</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Created {model.createdLabel} ago</span>
            <span>•</span>
            <span>{model.createdAtLabel}</span>
            <span>•</span>
            <Globe className="h-3.5 w-3.5" />
            <span>{model.platform}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className={cn('h-8', themedOutlineButtonClass)}
            onClick={() => runAction('scan', 'Scan complete. No critical issues detected.')}
          >
            <Scan className="mr-1.5 h-3.5 w-3.5" />
            Scan
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn('h-8 w-8', themedOutlineButtonClass)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => runAction('approve-top', 'Post approved.')}>
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => runAction('reject-top', 'Post rejected.')}>
                Reject
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => runAction('delete-top', 'Post deleted permanently.')}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => runAction('scan', 'Scan complete. No critical issues detected.')}>
                Scan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => runAction('feature', 'Post pinned to editor picks.')}>
                Pin to top posts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => runAction('archive', 'Post archived from active timeline.')}>
                Archive post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetClose asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              aria-label="Close drawer"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>
      </div>
    </header>
  );

  const detailsContent = (
    <TooltipProvider>
      <div className="space-y-3 px-4 py-4 sm:px-5">
        <SectionCard title="User Information">
          <div className="grid gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="h-14 w-14 border border-[var(--db-border-subtle)]">
                  <AvatarFallback className="bg-muted text-sm font-semibold text-foreground">
                    {initialsFromName(model.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {model.user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{model.user.handle}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    User ID: {model.user.userId}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <Button size="sm" variant="outline" className={cn('h-8 justify-start', themedOutlineButtonClass)}>
                  <UserRound className="mr-1.5 h-3.5 w-3.5" />
                  View Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn('h-8 justify-start', themedOutlineButtonClass)}
                  onClick={() => runAction('ban', 'User temporarily suspended.')}
                >
                  <Ban className="mr-1.5 h-3.5 w-3.5" />
                  Ban / Suspend
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn('h-8 justify-start', themedOutlineButtonClass)}
                  onClick={() => runAction('shadow', 'User shadowban applied.')}
                >
                  <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                  Shadowban
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <MetricBox label="Account Age" value={model.user.accountAge} />
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <MetricBox label="Trust Score" value={`${model.user.trustScore} / 100`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Lower trust score indicates higher risk profile.</TooltipContent>
              </Tooltip>
              <MetricBox label="Followers" value={model.user.followers} />
              <MetricBox label="Posts" value={model.user.posts} />
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-background/80 px-3 py-2">
                Device ID{' '}
                <span className="block font-medium text-foreground">
                  {model.user.deviceId}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-background/80 px-3 py-2">
                IP Hash / Region{' '}
                <span className="block font-medium text-foreground">
                  {model.user.region}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-background/80 px-3 py-2">
                Linked Accounts
                <span className="mt-1 flex gap-1 text-foreground">
                  {model.user.linkedAccounts.map((acc) => (
                    <Badge key={acc} variant="neutral">
                      {acc}
                    </Badge>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Post Content"
          rightAction={
            <Button size="sm" variant="outline" className={cn('h-7 text-xs', themedOutlineButtonClass)}>
              <Copy className="mr-1 h-3.5 w-3.5" />
              Copy Text
            </Button>
          }
        >
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Heading</p>
              <Input
                value={model.content.heading}
                readOnly
                className="border-border bg-background/80 text-foreground"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Text</p>
              <div className="rounded-lg border border-border bg-background/80 p-3">
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {model.content.body}
                </p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Hashtags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {model.content.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
              <MetricBox label="Language" value={model.content.language} />
              <MetricBox label="AI Toxicity" value={`${model.content.toxicity}%`} />
              <MetricBox label="Sentiment" value={model.content.sentiment} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Moderation Insights">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
            <MetricBox label="Reports" value={model.insights.reports} />
            <div className="rounded-lg border border-border bg-background/80 p-3">
              <p className="text-[11px] text-muted-foreground">Top Report Reasons</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {model.insights.topReasons.map((reason) => (
                  <Badge key={reason} variant="warning">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background/80 p-3">
              <p className="text-[11px] text-muted-foreground">AI Flags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {model.insights.aiFlags.map((flag) => (
                  <Badge key={flag} variant="destructiveMuted">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background/80 p-3">
              <p className="text-[11px] text-muted-foreground">Severity</p>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    model.insights.severity === 'High'
                      ? 'text-[var(--db-accent-red)]'
                      : model.insights.severity === 'Medium'
                        ? 'text-[var(--db-accent-orange)]'
                        : 'text-[var(--db-accent-emerald)]',
                  )}
                >
                  {model.insights.severity}
                </span>
                <span className="text-xs text-muted-foreground">
                  {model.insights.confidence}%
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Confidence</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Moderation History"
          rightAction={
            <Button size="sm" variant="outline" className={cn('h-7 text-xs', themedOutlineButtonClass)}>
              View full history
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          }
        >
          <div className="space-y-4">
            {model.history.map((event, index) => (
              <div key={`${event.time}-${index}`} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <ToneDot tone={event.tone} />
                  {index < model.history.length - 1 ? (
                    <span className="mt-1 h-10 w-px bg-[var(--db-border-subtle)]" />
                  ) : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.actor}</p>
                  <p className="text-xs text-muted-foreground">{event.note}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Engagement Metrics">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {model.metrics.map((metric) => (
              <button
                key={metric.label}
                type="button"
                className={cn(
                  'rounded-lg border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-3 py-2 text-left transition hover:bg-[var(--db-overlay-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--db-border-soft)]',
                  'dark:border-border dark:bg-background/80 dark:hover:bg-muted/40 dark:focus-visible:ring-border',
                )}
                onClick={() => {
                  if (metric.label === 'Likes') setView('likes');
                  else if (metric.label === 'Comments') setView('comments');
                  else if (metric.label === 'Shares') setView('shares');
                  else setView('reach');
                }}
              >
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  {metric.icon}
                  {metric.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {metric.value}
                </p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Admin Notes">
          <div className="space-y-3">
            {model.notes.map((note) => (
              <div
                key={`${note.author}-${note.at}`}
                className="rounded-lg border border-border bg-background/80 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground">
                    {note.author}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{note.at}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{note.text}</p>
              </div>
            ))}

            <div className="flex gap-2">
              <Textarea
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
                className="min-h-[70px] border-border bg-background/80 text-foreground placeholder:text-muted-foreground"
                placeholder="Add an internal note..."
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  if (!noteInput.trim()) {
                    return;
                  }
                  setNoteInput('');
                  toast.success('Internal note added.');
                }}
              >
                Add note
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </TooltipProvider>
  );

  const content = (() => {
    if (view === 'details') {
      return detailsContent;
    }

    if (view === 'comments') {
      return (
        <ListShell title="Comments" onBack={() => setView('details')}>
          <div className="space-y-2">
            {Array.from({ length: 12 }).map((_, idx) => {
              const u = pseudoUsers[idx % pseudoUsers.length]!;
              const isFlagged = idx % 7 === 0;
              return (
                <div
                  key={`${u.id}-${idx}`}
                  className="rounded-lg border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] px-3 py-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 border border-[var(--db-border-subtle)]">
                        <AvatarFallback className="bg-[var(--db-overlay-soft)] text-xs font-semibold text-[var(--db-text-primary)]">
                          {initialsFromName(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[var(--db-text-primary)]">
                          {u.name}{' '}
                          <span className="ml-1 font-normal text-[var(--db-text-muted)]">
                            {u.handle} · {u.when}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-[var(--db-text-secondary)]">
                          {idx % 3 === 0
                            ? 'This post helped me today. Thanks for sharing.'
                            : idx % 3 === 1
                              ? 'Can you clarify what you mean by that line?'
                              : 'I disagree, but I respect the perspective.'}
                        </p>
                      </div>
                    </div>
                    {isFlagged ? <Badge variant="destructiveMuted">Flagged</Badge> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </ListShell>
      );
    }

    const title = view === 'likes' ? 'Likes' : view === 'shares' ? 'Shares' : 'Reach';
    const helper =
      view === 'likes'
        ? 'Users who liked this post'
        : view === 'shares'
          ? 'Users who shared this post'
          : 'Users reached by this post';

    return (
      <ListShell title={title} onBack={() => setView('details')}>
        <p className="mb-3 text-xs text-muted-foreground">{helper}</p>
        <div className="space-y-2">
          {pseudoUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between rounded-lg border border-border bg-background/80 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
                    {initialsFromName(u.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">{u.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{u.handle}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">{u.when}</p>
            </div>
          ))}
        </div>
      </ListShell>
    );
  })();

  const footer = (
    <footer className="sticky bottom-0 z-20 border-t border-border bg-background/85 px-4 py-3 backdrop-blur-md sm:px-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className={themedOutlineButtonClass}
            onClick={() => runAction('warn-user', 'Warning sent to user.')}
          >
            <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
            Warn User
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={themedOutlineButtonClass}
            onClick={() => runAction('ban-user', 'User suspended for 7 days.')}
          >
            <Ban className="mr-1.5 h-3.5 w-3.5" />
            Ban User
          </Button>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            size="sm"
            variant="success"
            className={themedSuccessButtonClass}
            disabled={loadingAction !== null}
            onClick={() => runAction('approve', 'Post approved.')}
          >
            <Check className="mr-1.5 h-3.5 w-3.5" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className={themedDangerButtonClass}
            disabled={loadingAction !== null}
            onClick={() => runAction('reject', 'Post rejected.')}
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={themedOutlineButtonClass}
            disabled={loadingAction !== null}
            onClick={() => runAction('delete', 'Post deleted.')}
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </footer>
  );

  return (
    <GenericDrawerShell
      open={open && post !== null}
      onOpenChangeAction={onOpenChangeAction}
      title={`Post management ${model.postId}`}
      description="Review post details, moderation insights, and take action quickly."
      widthClassName="sm:max-w-[50vw]"
      className="bg-gradient-to-br from-[var(--db-bg-start)] via-[var(--db-card-grad-from)] to-[var(--db-bg-end)]"
      header={header}
      content={content}
      footer={footer}
    />
  );
};

