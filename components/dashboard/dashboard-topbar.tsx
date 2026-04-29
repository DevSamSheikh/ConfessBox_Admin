'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';
import { cn } from '@/lib/utils';

export const DashboardTopbar = ({
  profileName,
  profileInitials,
}: {
  profileName: string;
  profileInitials: string;
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="truncate text-lg font-semibold text-slate-950 dark:text-slate-50">
          Dashboard
        </div>
        <div className="truncate text-sm text-slate-600 dark:text-slate-400">
          Hello {profileName}, welcome back!
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search"
            className={cn(
              'h-11 rounded-full pr-11',
              'bg-white/70 border-slate-200 text-slate-950 placeholder:text-slate-500',
              'dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-50 dark:placeholder:text-slate-400',
              'focus-visible:ring-primary-500/30',
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div
            className={cn(
              'flex items-center gap-3 rounded-full border px-4 py-2',
              'bg-white/60 border-slate-200',
              'dark:bg-slate-950/40 dark:border-slate-800',
            )}
          >
            <ThemeSwitch />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 rounded-full border bg-white/60 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary-100 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100">
                {profileInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden min-w-0 sm:block">
              <div className="truncate text-sm font-medium text-slate-950 dark:text-slate-50">
                {profileName}
              </div>
              <div className="truncate text-xs text-slate-600 dark:text-slate-400">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

