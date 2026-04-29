'use client';

import type React from 'react';
import { Menu } from 'lucide-react';
import { CustomLink } from '@/components/shared/Link';
import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { cn } from '@/lib/utils';
import {
  dashboardChannelsNav,
  dashboardPrimaryNav,
  dashboardUtilityNav,
} from '@/components/dashboard/dashboard-nav';

const MobileSection = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ key: string; label: string; href: string; icon: React.ComponentType<{ className?: string }> }>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {title}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <CustomLink
              key={item.key}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-3 py-2 text-sm',
                'text-slate-800 hover:bg-slate-100',
                'dark:text-slate-200 dark:hover:bg-slate-900/40',
              )}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl border bg-white/60 dark:border-slate-800 dark:bg-slate-950/40">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>{item.label}</span>
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
};

export const DashboardMobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-2xl lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Confess Box</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
          <MobileSection title="Main" items={dashboardPrimaryNav} />
          <MobileSection title="Channels" items={dashboardChannelsNav} />
          <MobileSection title="System" items={dashboardUtilityNav} />

          <Button variant="primary" className="h-11 w-full rounded-2xl">
            Add New Account
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

