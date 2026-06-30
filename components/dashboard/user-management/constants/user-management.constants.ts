import type { UserRecord, UserRole, UserStatus } from '@/components/dashboard/user-management/types/user-management.types';

export const USERS: UserRecord[] = [
  {
    id: 'USR-001',
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    phone: '+1 202 555 0148',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 min ago',
    location: 'New York, USA',
    joinedDate: '15 Jan 2024',
    sessions: 128,
    emailVerified: true,
    phoneVerified: true,
    fraudScore: 14,
    spamRisk: 8,
  },
  {
    id: 'USR-002',
    name: 'Cameron Williamson',
    email: 'cameron.w@example.com',
    phone: '+1 202 555 0198',
    role: 'Editor',
    status: 'Active',
    lastActive: '15 min ago',
    location: 'London, UK',
    joinedDate: '12 Jan 2024',
    sessions: 92,
    emailVerified: true,
    phoneVerified: false,
    fraudScore: 21,
    spamRisk: 17,
  },
  {
    id: 'USR-003',
    name: 'Eleanor Pena',
    email: 'eleanor.p@example.com',
    phone: '+1 202 555 0125',
    role: 'User',
    status: 'Pending',
    lastActive: '1 hour ago',
    location: 'Toronto, CA',
    joinedDate: '10 Jan 2024',
    sessions: 36,
    emailVerified: false,
    phoneVerified: false,
    fraudScore: 39,
    spamRisk: 31,
  },
  {
    id: 'USR-004',
    name: 'Brooklyn Simmons',
    email: 'brooklyn.s@example.com',
    phone: '+1 202 555 0175',
    role: 'User',
    status: 'Active',
    lastActive: '3 hours ago',
    location: 'Sydney, AU',
    joinedDate: '8 Jan 2024',
    sessions: 71,
    emailVerified: true,
    phoneVerified: true,
    fraudScore: 18,
    spamRisk: 11,
  },
  {
    id: 'USR-005',
    name: 'Leslie Alexander',
    email: 'leslie.a@example.com',
    phone: '+1 202 555 0100',
    role: 'Moderator',
    status: 'Suspended',
    lastActive: '1 day ago',
    location: 'Berlin, Germany',
    joinedDate: '5 Jan 2024',
    sessions: 11,
    emailVerified: true,
    phoneVerified: true,
    fraudScore: 72,
    spamRisk: 68,
  },
  {
    id: 'USR-006',
    name: 'Darrell Steward',
    email: 'darrell.s@example.com',
    phone: '+1 202 555 0133',
    role: 'User',
    status: 'Active',
    lastActive: '2 days ago',
    location: 'Chicago, USA',
    joinedDate: '3 Jan 2024',
    sessions: 44,
    emailVerified: true,
    phoneVerified: false,
    fraudScore: 27,
    spamRisk: 23,
  },
  {
    id: 'USR-007',
    name: 'Jenny Wilson',
    email: 'jenny.w@example.com',
    phone: '+1 202 555 0188',
    role: 'User',
    status: 'Active',
    lastActive: '2 days ago',
    location: 'San Francisco, USA',
    joinedDate: '1 Jan 2024',
    sessions: 84,
    emailVerified: true,
    phoneVerified: true,
    fraudScore: 16,
    spamRisk: 9,
  },
  {
    id: 'USR-008',
    name: 'Wade Warren',
    email: 'wade.w@example.com',
    phone: '+1 202 555 0166',
    role: 'Editor',
    status: 'Active',
    lastActive: '3 days ago',
    location: 'Vancouver, CA',
    joinedDate: '28 Dec 2023',
    sessions: 57,
    emailVerified: true,
    phoneVerified: true,
    fraudScore: 22,
    spamRisk: 15,
  },
];

export const STATUS_CLASS: Record<UserStatus, string> = {
  Active:
    'border-[color-mix(in_srgb,var(--db-accent-emerald)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-emerald)_18%,transparent)] text-[var(--db-accent-emerald)]',
  Suspended:
    'border-[color-mix(in_srgb,var(--db-accent-red)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-red)_18%,transparent)] text-[var(--db-accent-red)]',
  Pending:
    'border-[color-mix(in_srgb,var(--db-accent-orange)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-orange)_18%,transparent)] text-[var(--db-accent-orange)]',
};

export const ROLE_CLASS: Record<UserRole, string> = {
  Admin:
    'border-[color-mix(in_srgb,var(--db-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-primary)_18%,transparent)] text-[var(--db-primary)]',
  Editor:
    'border-[color-mix(in_srgb,var(--db-accent-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-accent-cyan)_18%,transparent)] text-[var(--db-accent-cyan)]',
  User:
    'border-[color-mix(in_srgb,var(--db-secondary)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-secondary)_18%,transparent)] text-[var(--db-secondary)]',
  Moderator:
    'border-[color-mix(in_srgb,var(--db-line-likes)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-line-likes)_18%,transparent)] text-[var(--db-line-likes)]',
};

export const USER_PAGE_SIZE = 8;

export const USER_PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

/** Checkbox styling for user-management table selection */
export const USER_TABLE_CHECKBOX_CLASS =
  'border-[var(--db-border-soft)] bg-transparent dark:bg-transparent data-[state=checked]:border-[var(--db-secondary)] data-[state=checked]:bg-[var(--db-secondary)] data-[state=checked]:text-white dark:data-[state=checked]:bg-[var(--db-secondary)]';
