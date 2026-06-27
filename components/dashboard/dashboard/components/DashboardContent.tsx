'use client';

import dynamic from 'next/dynamic';
import { Heart, MessageSquare, UserPlus, Users } from 'lucide-react';
import { buildModerationReportDetail } from '@/app/dashboard/moderation-report-detail';
import {
  dashboardAudience,
  dashboardComments,
  dashboardKpis,
  dashboardProfile,
  dashboardReports,
  dashboardTopPosts,
  dashboardTrend,
} from '@/app/dashboard/dashboard-data';
import { DonutChartCard } from '@/components/dashboard/DonutChartCard';
import { KPICard } from '@/components/dashboard/KPICard';
import { LineChartCard } from '@/components/dashboard/LineChartCard';
import { ReportsTable } from '@/components/dashboard/ReportsTable';
import { TopPostsCard } from '@/components/dashboard/TopPostsCard';
import { dashboardMainClassName } from '@/components/dashboard/dashboard/constants/dashboard.constants';
import { useDashboard } from '@/components/dashboard/dashboard/hooks/useDashboard';
import { formatCompactNumber } from '@/components/dashboard/dashboard/utils/dashboard.utils';

const ReportModerationDrawer = dynamic(
  () =>
    import('@/components/dashboard/ReportModerationDrawer').then((module) => module.ReportModerationDrawer),
  { ssr: false },
);

const PostManagementDrawer = dynamic(
  () =>
    import('@/components/dashboard/drawers/PostManagementDrawer').then((module) => module.PostManagementDrawer),
  { ssr: false },
);

export const DashboardMain = () => {
  const {
    postDrawerOpen,
    reportDrawerOpen,
    selectedDetail,
    selectedTopPost,
    setPostDrawerOpen,
    setReportDrawerOpen,
    setSelectedDetail,
    setSelectedTopPost,
  } = useDashboard();

  return (
    <div className={dashboardMainClassName}>
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4">
          <KPICard
            icon={<Users className="h-5 w-5 text-[var(--db-primary)]" />}
            label={dashboardKpis[0].label}
            value={formatCompactNumber(dashboardKpis[0].value)}
            change={`+${dashboardKpis[0].deltaPercent.toFixed(1)}%`}
            changeTone="positive"
          />
          <KPICard
            icon={<UserPlus className="h-5 w-5 text-[var(--db-secondary)]" />}
            label={dashboardKpis[1].label}
            value={formatCompactNumber(dashboardKpis[1].value)}
            change={`+${dashboardKpis[1].deltaPercent.toFixed(1)}%`}
            changeTone="positive"
          />
          <KPICard
            icon={<Heart className="h-5 w-5 text-[var(--db-accent-emerald)]" />}
            label={dashboardKpis[2].label}
            value={formatCompactNumber(dashboardKpis[2].value)}
            change={`${dashboardKpis[2].deltaPercent.toFixed(1)}%`}
            changeTone="negative"
          />
          <KPICard
            icon={<MessageSquare className="h-5 w-5 text-[var(--db-accent-orange)]" />}
            label={dashboardKpis[3].label}
            value={formatCompactNumber(dashboardKpis[3].value)}
            change={`+${dashboardKpis[3].deltaPercent.toFixed(1)}%`}
            changeTone="positive"
          />
        </section>

        <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
          <LineChartCard data={dashboardTrend} />
          <DonutChartCard segments={dashboardAudience} />
        </section>

        <section>
          <ReportsTable
            reports={dashboardReports}
            onSelectReport={(row) => {
              setSelectedDetail(buildModerationReportDetail(row));
              setReportDrawerOpen(true);
            }}
          />
        </section>

        <section>
          <TopPostsCard
            items={dashboardTopPosts}
            onSelectPostAction={(post) => {
              setSelectedTopPost(post);
              setPostDrawerOpen(true);
            }}
          />
        </section>

        <ReportModerationDrawer
          open={reportDrawerOpen}
          onOpenChangeAction={(open) => {
            setReportDrawerOpen(open);
            if (!open) {
              setSelectedDetail(null);
            }
          }}
          detail={selectedDetail}
        />
        <PostManagementDrawer
          open={postDrawerOpen}
          onOpenChangeAction={(open) => {
            setPostDrawerOpen(open);
            if (!open) {
              setSelectedTopPost(null);
            }
          }}
          post={selectedTopPost}
        />
    </div>
  );
};

export { dashboardComments, dashboardProfile };
