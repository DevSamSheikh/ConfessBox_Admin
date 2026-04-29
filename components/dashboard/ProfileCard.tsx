'use client';

import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import type { DashboardProfile } from '@/app/dashboard/dashboard-data';

export const ProfileCard = ({ profile }: { profile: DashboardProfile }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-500 text-white rounded-2xl p-5 border border-white/10">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-white/15 text-white">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">{profile.displayName}</div>
            <div className="text-white/80 text-sm truncate">{profile.handle}</div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          aria-label="Profile options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {profile.stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white/10 px-3 py-2">
            <div className="text-xs text-white/70">{s.label}</div>
            <div className="text-sm font-semibold">{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

