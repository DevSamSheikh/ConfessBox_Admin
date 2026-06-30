import type { LucideIcon } from 'lucide-react';
import {
  CalendarDays,
  FileText,
  Gauge,
  Inbox,
  Instagram,
  LifeBuoy,
  LockKeyhole,
  MessageCircle,
  Send,
  Settings,
  Sparkles,
  UserCog,
} from 'lucide-react';

export type DashboardNavItem = {
  key:
    | 'dashboard'
    | 'user-management'
    | 'post-management'
    | 'schedules'
    | 'inbox'
    | 'reporting'
    | 'instagram'
    | 'facebook'
    | 'telegram'
    | 'settings'
    | 'help'
    | 'privacy';
  label: string;
  icon: LucideIcon;
  href: string;
};

export const dashboardPrimaryNav: DashboardNavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Gauge, href: '/dashboard' },
  {
    key: 'user-management',
    label: 'User Management',
    icon: UserCog,
    href: '/dashboard/user-management',
  },
  {
    key: 'post-management',
    label: 'Post Management',
    icon: FileText,
    href: '/dashboard/post-management',
  },
  {
    key: 'schedules',
    label: 'Schedules',
    icon: CalendarDays,
    href: '/dashboard',
  },
  { key: 'inbox', label: 'Inbox', icon: Inbox, href: '/dashboard' },
  {
    key: 'reporting',
    label: 'Reporting',
    icon: MessageCircle,
    href: '/dashboard',
  },
];

export const dashboardChannelsNav: DashboardNavItem[] = [
  { key: 'instagram', label: 'Instagram', icon: Instagram, href: '/dashboard' },
  // Not a full channel list yet — placeholders keep the rail balanced.
  { key: 'facebook', label: 'Facebook', icon: Sparkles, href: '/dashboard' },
  { key: 'telegram', label: 'Telegram', icon: Send, href: '/dashboard' },
];

export const dashboardUtilityNav: DashboardNavItem[] = [
  { key: 'settings', label: 'Settings', icon: Settings, href: '/dashboard' },
  { key: 'help', label: 'Help & feedback', icon: LifeBuoy, href: '/dashboard' },
  { key: 'privacy', label: 'Privacy & policies', icon: LockKeyhole, href: '/dashboard' },
];

