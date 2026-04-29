'use client';

import { ArrowDownRight, ArrowUpRight, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import type { DashboardComment } from '@/app/dashboard/dashboard-data';

export const CommentsList = ({ comments }: { comments: DashboardComment[] }) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#12101F] p-5">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-semibold">Comments</div>
        <div className="rounded-full border border-white/10 bg-[#171526] px-2.5 py-1 text-xs text-gray-400">
          Live feed
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1A1830] to-[#141224] p-4 transition hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                    {c.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{c.author.name}</div>
                  <div className="text-xs text-gray-500 truncate">{c.author.role}</div>
                </div>
              </div>
              <div className="shrink-0 rounded-full border border-white/10 bg-[#12101F] px-2 py-0.5 text-[11px] text-gray-400">
                {c.createdAtLabel}
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-300 line-clamp-3">
              {c.message}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{c.upvotes}</span>
                </div>
                <div className="flex items-center gap-1 text-red-400">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  <span>{c.downvotes}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-400 hover:bg-white/10 hover:text-red-400"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-400 hover:bg-white/10 hover:text-violet-300"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-400 hover:bg-white/10 hover:text-cyan-300"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
        See All →
      </Button>
    </Card>
  );
};

