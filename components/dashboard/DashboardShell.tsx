'use client';

import { useEffect, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  dashboardComments,
  dashboardProfile,
} from '@/app/dashboard/dashboard-data';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Header } from '@/components/dashboard/Header';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { Sidebar } from '@/components/dashboard/Sidebar';

const DASHBOARD_PREFETCH_ROUTES = ['/dashboard', '/dashboard/user-management'] as const;

const getPageHeader = (pathname: string, profileName: string) => {
  if (pathname.startsWith('/dashboard/user-management')) {
    return {
      title: 'User Management',
      subtitle: 'Manage users, roles, and account status.',
    };
  }

  return {
    title: 'Dashboard',
    subtitle: `Hello ${profileName}, Welcome back!`,
  };
};

export const DashboardShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const showRightPanel = pathname === '/dashboard';

  const header = useMemo(
    () => getPageHeader(pathname, dashboardProfile.displayName),
    [pathname],
  );

  useEffect(() => {
    DASHBOARD_PREFETCH_ROUTES.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      main={
        <div className="flex min-h-0 flex-1 flex-col gap-5 px-4 py-5 sm:px-6 xl:pr-2">
          <Header
            profileName={dashboardProfile.displayName}
            profileInitials={dashboardProfile.initials}
            title={header.title}
            subtitle={header.subtitle}
          />
          {children}
        </div>
      }
      rightPanel={
        showRightPanel ? (
          <RightPanel profile={dashboardProfile} comments={dashboardComments} />
        ) : null
      }
    />
  );
};
