'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { Sidebar } from '@/components/dashboard/Sidebar';
import {
  DashboardMain,
  dashboardComments,
  dashboardProfile,
} from '@/components/dashboard/dashboard/components/DashboardContent';

export const DashboardPage = () => {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      main={<DashboardMain />}
      rightPanel={<RightPanel profile={dashboardProfile} comments={dashboardComments} />}
    />
  );
};
