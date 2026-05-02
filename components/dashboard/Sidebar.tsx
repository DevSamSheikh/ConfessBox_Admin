'use client';

import { useMemo, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CustomLink } from '@/components/shared/Link';
import { Button } from '@/components/shared/ui/button';
import { cn } from '@/lib/utils';
import {
  dashboardChannelsNav,
  dashboardPrimaryNav,
  dashboardUtilityNav,
  type DashboardNavItem,
} from '@/components/dashboard/dashboard-nav';

const NavGroup = ({
  items,
  activeKey,
  collapsed,
}: {
  items: DashboardNavItem[];
  activeKey: DashboardNavItem['key'];
  collapsed: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === activeKey;
        return (
          <CustomLink
            key={item.key}
            href={item.href}
            className={cn(
              'flex items-center rounded-md gap-3  px-3 py-2 text-sm ',
              'text-[var(--db-textPrimary)] hover:bg-[var(--db-primary)]',
              collapsed && 'justify-center px-2',
              isActive &&
                'border-[var(--db-primary)] bg-[color-mix(in_srgb,var(--db-primary)_20%,transparent)] hover:text-[var(--db-textPrimary)] text-[var(--db-primary)]',
            )}
            aria-label={collapsed ? item.label : undefined}
            title={collapsed ? item.label : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </CustomLink>
        );
      })}
    </div>
  );
};

export const Sidebar = ({
  collapsed: collapsedProp,
  onCollapsedChange,
}: {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}) => {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = collapsedProp ?? internalCollapsed;
  const setCollapsed = (next: boolean) => {
    onCollapsedChange?.(next);
    if (collapsedProp === undefined) {
      setInternalCollapsed(next);
    }
  };
  const allNavItems = useMemo(
    () => [
      ...dashboardPrimaryNav,
      ...dashboardChannelsNav,
      ...dashboardUtilityNav,
    ],
    [],
  );
  const activeKey = useMemo<DashboardNavItem['key']>(() => {
    if (pathname.startsWith('/dashboard/user-management')) {
      return 'user-management';
    }

    return 'dashboard';
  }, [pathname]);

  return (
    <aside
      className={cn(
        'hidden h-screen sticky top-0 xl:flex flex-col justify-between border-r border-[var(--db-border-subtle)] bg-[var(--db-sidebar-bg)] py-6 transition-all duration-200',
        collapsed ? 'w-[84px] px-3' : 'w-[240px] px-4',
      )}
    >
      <div className="flex flex-col gap-6">
        <div
          className={cn(
            'flex items-center',
            collapsed ? 'justify-center' : 'justify-between',
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--db-overlay-strong)] flex items-center justify-center text-[var(--db-text-primary)] font-semibold">
              C
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-[var(--db-text-primary)] font-semibold truncate">
                  Confess Box
                </div>
                <div className="text-[var(--db-text-secondary)] text-sm truncate">
                  Dashboard
                </div>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-text-primary)]"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          )}
          {collapsed && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-6 right-3 h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-text-primary)]"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          )}
        </div>

        <NavGroup
          items={allNavItems}
          activeKey={activeKey}
          collapsed={collapsed}
        />
      </div>

      <Button
        className={cn(
          'rounded-full bg-[var(--db-primary)] text-[var(--db-text-primary)] hover:bg-[var(--db-primary-hover)]',
          collapsed ? 'h-11 w-11 self-center p-0' : 'w-full',
        )}
        aria-label="Add New Account"
        title={collapsed ? 'Add New Account' : undefined}
      >
        {collapsed ? <Plus className="h-4 w-4" /> : '+ Add New Account'}
      </Button>
    </aside>
  );
};
