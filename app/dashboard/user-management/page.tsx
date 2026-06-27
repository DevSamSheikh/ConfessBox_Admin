import { genPageMetadata } from '@/app/seo';
import { UserManagementPage } from '@/components/dashboard/user-management';

export const metadata = genPageMetadata({
  title: 'User Management',
  description: 'Modern admin user management with interactive control drawer.',
});

export default function Page() {
  return <UserManagementPage />;
}
