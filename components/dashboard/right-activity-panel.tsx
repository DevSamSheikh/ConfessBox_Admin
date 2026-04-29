'use client';

import { MoreHorizontal, MessageSquare, Heart, Share2, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type {
  DashboardComment,
  DashboardProfile,
} from '@/app/dashboard/dashboard-data';

const ProfileCard = ({ profile }: { profile: DashboardProfile }) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-3xl border p-5 text-white shadow-sm',
        'border-primary-500/20',
        'bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500',
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" aria-hidden="true" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarFallback className="bg-white/15 text-white">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{profile.displayName}</div>
              <div className="truncate text-xs text-white/80">{profile.handle}</div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-white hover:bg-white/10 hover:text-white"
            aria-label="Profile menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur">
              <div className="text-xs text-white/70">{s.label}</div>
              <div className="mt-1 text-sm font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const CommentItem = ({ comment }: { comment: DashboardComment }) => {
  return (
    <div
      className={cn(
        'rounded-3xl border p-4 transition-colors',
        'bg-white/70 border-slate-200 hover:bg-white',
        'dark:bg-slate-950/40 dark:border-slate-800 dark:hover:bg-slate-950/60',
      )}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
            {comment.author.initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              {comment.author.name}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {comment.author.role}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              · {comment.createdAtLabel}
            </div>
          </div>

          <div className="mt-2 line-clamp-3 text-sm text-slate-700 dark:text-slate-300">
            {comment.message}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Like">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Reply">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RightActivityPanel = ({
  profile,
  comments,
}: {
  profile: DashboardProfile;
  comments: DashboardComment[];
}) => {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
      <ProfileCard profile={profile} />

      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
          Comments
        </div>
        <Button variant="ghost" className="rounded-full">
          See All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </aside>
  );
};

