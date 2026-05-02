import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';
import type { ModerationReportDetail } from '@/app/dashboard/moderation-report-detail';

export type DashboardState = {
  reportDrawerOpen: boolean;
  postDrawerOpen: boolean;
  selectedDetail: ModerationReportDetail | null;
  selectedTopPost: DashboardTopPost | null;
};
