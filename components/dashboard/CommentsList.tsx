'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import type { DashboardComment } from '@/app/dashboard/dashboard-data';

export const CommentsList = ({ comments }: { comments: DashboardComment[] }) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#12101F] p-5">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-semibold">Comments</div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {comments.map((c) => (
          <div key={c.id} className="rounded-2xl bg-[#171526] p-4 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-white/10 text-white">
                  {c.author.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm truncate">
                      {c.author.name}
                    </div>
                    <div className="text-gray-500 text-xs truncate">
                      {c.author.role}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-gray-400 text-sm line-clamp-3">
                  {c.message}
                </div>
                <div className="mt-3 flex items-center gap-2 text-gray-400">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
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

