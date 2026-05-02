import { genPageMetadata } from '@/app/seo';
import dynamic from 'next/dynamic';
import { DashboardRouteLoader } from '@/components/dashboard/DashboardRouteLoader';

const DashboardPage = dynamic(
  () => import('@/components/dashboard/dashboard').then((module) => module.DashboardPage),
  {
    loading: () => <DashboardRouteLoader label="Loading dashboard..." />,
  },
);

export const metadata = genPageMetadata({
  title: 'Dashboard',
  description: 'Premium anonymous confession analytics dashboard.',
});

export default function Page() {
  return <DashboardPage />;
}
