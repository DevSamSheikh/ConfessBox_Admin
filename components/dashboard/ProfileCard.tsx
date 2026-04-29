'use client';

import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import type { DashboardProfile } from '@/app/dashboard/dashboard-data';

export const ProfileCard = ({ profile }: { profile: DashboardProfile }) => {
  return (
    <Card className="bg-gradient-to-br from-[var(--db-primary)] to-[var(--db-secondary)] text-[var(--db-text-primary)] rounded-2xl p-5 border border-[var(--db-border-subtle)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-[var(--db-overlay-strong)] text-[var(--db-text-primary)]">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">{profile.displayName}</div>
            <div className="text-[color-mix(in_srgb,var(--db-text-primary)_80%,transparent)] text-sm truncate">{profile.handle}</div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-[var(--db-text-primary)] hover:bg-[var(--db-overlay-soft)]"
          aria-label="Profile options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {profile.stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-[var(--db-overlay-strong)] px-3 py-2">
            <div className="text-xs text-[color-mix(in_srgb,var(--db-text-primary)_75%,transparent)]">{s.label}</div>
            <div className="text-sm font-semibold">{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

