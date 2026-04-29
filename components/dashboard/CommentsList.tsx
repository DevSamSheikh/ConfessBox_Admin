'use client';

import { ArrowDownRight, ArrowUpRight, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import type { DashboardComment } from '@/app/dashboard/dashboard-data';

export const CommentsList = ({ comments }: { comments: DashboardComment[] }) => {
  return (
    <Card className="rounded-2xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[var(--db-text-primary)] text-lg font-semibold">Comments</div>
        <div className="rounded-full border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] px-2.5 py-1 text-xs text-[var(--db-text-secondary)]">
          Live feed
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-[var(--db-border-subtle)] bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-grad-to)] p-4 transition hover:border-[var(--db-border-soft)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-[var(--db-primary)] to-[var(--db-secondary)] text-[var(--db-text-primary)]">
                    {c.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[var(--db-text-primary)] truncate">{c.author.name}</div>
                  <div className="text-xs text-[var(--db-text-muted)] truncate">{c.author.role}</div>
                </div>
              </div>
              <div className="shrink-0 rounded-full border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] px-2 py-0.5 text-[11px] text-[var(--db-text-secondary)]">
                {c.createdAtLabel}
              </div>
            </div>

            <div className="mt-3 text-sm text-[var(--db-text-secondary)] line-clamp-3">
              {c.message}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-[var(--db-accent-emerald)]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{c.upvotes}</span>
                </div>
                <div className="flex items-center gap-1 text-[var(--db-accent-red)]">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  <span>{c.downvotes}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[var(--db-text-secondary)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-accent-red)]"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-secondary)]"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-accent-cyan)]"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-5 w-full rounded-full bg-[var(--db-primary)] text-[var(--db-text-primary)] hover:bg-[var(--db-primary-hover)]">
        See All →
      </Button>
    </Card>
  );
};

