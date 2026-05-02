import type { UserRecord } from '@/components/dashboard/user-management/types/user-management.types';

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const isUserInLocationBucket = (user: UserRecord, locationFilter: string) => {
  const location = user.location.toLowerCase();
  if (locationFilter === 'all') {
    return true;
  }
  if (locationFilter === 'usa') {
    return location.includes('usa');
  }
  if (locationFilter === 'europe') {
    return location.includes('uk') || location.includes('germany');
  }
  if (locationFilter === 'asia') {
    return location.includes('india');
  }

  return (
    !location.includes('usa') &&
    !location.includes('uk') &&
    !location.includes('germany') &&
    !location.includes('india')
  );
};
