'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';

export const Header = ({
  profileName,
  profileInitials,
  title = 'Dashboard',
  subtitle,
}: {
  profileName: string;
  profileInitials: string;
  title?: string;
  subtitle?: string;
}) => {
  const resolvedSubtitle = subtitle ?? `Hello ${profileName}, Welcome back!`;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="text-[var(--db-text-primary)] text-lg font-semibold">{title}</div>
        <div className="text-[var(--db-text-secondary)] text-sm truncate">{resolvedSubtitle}</div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
        <div className="relative w-full sm:w-72 lg:w-[360px]">
          <Input
            placeholder="Search"
            className="h-10 rounded-full bg-[var(--db-card-bg)] border border-[var(--db-border-subtle)] text-[var(--db-text-primary)] placeholder:text-[var(--db-text-muted)] pr-10"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--db-text-secondary)]">
            <Search className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <ThemeSwitch />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[var(--db-overlay-soft)] text-[var(--db-text-secondary)]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-[var(--db-overlay-strong)] text-[var(--db-text-primary)]">
                {profileInitials}
              </AvatarFallback>
            </Avatar>
            <div className="text-[var(--db-text-primary)] text-sm font-medium">{profileName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

