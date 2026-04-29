import { genPageMetadata } from '@/app/seo';
import { DashboardPage } from '@/components/dashboard/DashboardPage';

export const metadata = genPageMetadata({
  title: 'Dashboard',
  description: 'Premium anonymous confession analytics dashboard.',
});

export default function Page() {
  return <DashboardPage />;
}
