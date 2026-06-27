import { genPageMetadata } from '@/app/seo';
import { DashboardMain } from '@/components/dashboard/dashboard/components/DashboardContent';

export const metadata = genPageMetadata({
  title: 'Dashboard',
  description: 'Premium anonymous confession analytics dashboard.',
});

export default function Page() {
  return <DashboardMain />;
}
