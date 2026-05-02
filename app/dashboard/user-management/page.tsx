import { genPageMetadata } from '@/app/seo';
import dynamic from 'next/dynamic';
import { dashboardProfile } from '@/app/dashboard/dashboard-data';
import { DashboardRouteLoader } from '@/components/dashboard/DashboardRouteLoader';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';

const UserManagementPage = dynamic(
  () => import('@/components/dashboard/user-management').then((module) => module.UserManagementPage),
  {
    loading: () => <DashboardRouteLoader label="Loading user management..." />,
  },
);

export const metadata = genPageMetadata({
  title: 'User Management',
  description: 'Modern admin user management with interactive control drawer.',
});

export default function Page() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      main={
        <main className="flex flex-col gap-5 px-4 py-5 sm:px-6 xl:pr-2">
          <Header
            profileName={dashboardProfile.displayName}
            profileInitials={dashboardProfile.initials}
          />
          <UserManagementPage />
        </main>
      }
      rightPanel={null}
    />
  );
}

