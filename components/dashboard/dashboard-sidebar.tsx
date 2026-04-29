'use client';

import { CustomLink } from '@/components/shared/Link';
import { Button } from '@/components/shared/ui/button';
import { cn } from '@/lib/utils';
import {
  dashboardChannelsNav,
  dashboardPrimaryNav,
  dashboardUtilityNav,
  type DashboardNavItem,
} from '@/components/dashboard/dashboard-nav';

const SidebarSection = ({
  title,
  items,
  activeKey,
}: {
  title: string;
  items: DashboardNavItem[];
  activeKey: DashboardNavItem['key'];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="px-3 text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {title}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;
          return (
            <CustomLink
              key={item.key}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
                'dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-50',
                isActive &&
                  cn(
                    'bg-primary-100/70 text-primary-900',
                    'dark:bg-primary-900/30 dark:text-primary-100',
                  ),
              )}
            >
              <span
                className={cn(
                  'absolute left-0 top-2 bottom-2 w-1 rounded-full bg-transparent transition-colors',
                  isActive && 'bg-primary-500',
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl border',
                  'border-slate-200 bg-white/60 text-slate-700',
                  'dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300',
                  isActive &&
                    cn(
                      'border-primary-200 bg-primary-100/70 text-primary-700',
                      'dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-200',
                    ),
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="truncate">{item.label}</span>
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
};

export const DashboardSidebar = () => {
  return (
    <aside
      className={cn(
        'hidden lg:flex lg:flex-col lg:gap-6 lg:rounded-3xl lg:border lg:p-4',
        'bg-white/70 border-slate-200 shadow-sm',
        'dark:bg-slate-950/40 dark:border-slate-800',
      )}
    >
      <div className="flex items-center gap-3 px-3 pt-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          <span className="text-sm font-semibold">C</span>
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
            Confess Box
          </div>
          <div className="truncate text-xs text-slate-600 dark:text-slate-400">
            Anonymous Insights
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <SidebarSection
          title="Main"
          items={dashboardPrimaryNav}
          activeKey="dashboard"
        />
        <SidebarSection
          title="Channels"
          items={dashboardChannelsNav}
          activeKey="instagram"
        />
      </div>

      <div className="flex flex-col gap-6">
        <SidebarSection
          title="System"
          items={dashboardUtilityNav}
          activeKey="settings"
        />
        <Button
          variant="primary"
          className={cn(
            'h-11 w-full justify-start rounded-2xl px-4',
            'shadow-sm shadow-primary-500/10',
          )}
        >
          Add New Account
        </Button>
      </div>
    </aside>
  );
};

