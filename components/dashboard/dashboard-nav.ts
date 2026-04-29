import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  CalendarDays,
  Gauge,
  Inbox,
  Instagram,
  LifeBuoy,
  LockKeyhole,
  MessageCircle,
  Send,
  Settings,
  Sparkles,
} from 'lucide-react';

export type DashboardNavItem = {
  key:
    | 'dashboard'
    | 'analytics'
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
  { key: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard' },
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

