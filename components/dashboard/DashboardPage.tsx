'use client';

import * as React from 'react';
import { Users, UserPlus, Heart, MessageSquare } from 'lucide-react';
import type { DashboardReport } from '@/app/dashboard/dashboard-data';
import { buildModerationReportDetail } from '@/app/dashboard/moderation-report-detail';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { LineChartCard } from '@/components/dashboard/LineChartCard';
import { DonutChartCard } from '@/components/dashboard/DonutChartCard';
import { ReportModerationDrawer } from '@/components/dashboard/ReportModerationDrawer';
import { ReportsTable } from '@/components/dashboard/ReportsTable';
import { TopPostsCard } from '@/components/dashboard/TopPostsCard';
import { RightPanel } from '@/components/dashboard/RightPanel';
import {
  dashboardAudience,
  dashboardComments,
  dashboardKpis,
  dashboardProfile,
  dashboardReports,
  dashboardTopPosts,
  dashboardTrend,
} from '@/app/dashboard/dashboard-data';

const formatCompact = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

export const DashboardPage = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<DashboardReport | null>(null);

  const moderationDetail = React.useMemo(
    () => (selectedReport ? buildModerationReportDetail(selectedReport) : null),
    [selectedReport],
  );

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      main={
        <main className="flex flex-col gap-5 px-4 py-5 sm:px-6 xl:pr-2">
          <Header
            profileName={dashboardProfile.displayName}
            profileInitials={dashboardProfile.initials}
          />

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4">
            <KPICard
              icon={<Users className="h-5 w-5 text-[var(--db-primary)]" />}
              label={dashboardKpis[0].label}
              value={formatCompact(dashboardKpis[0].value)}
              change={`+${dashboardKpis[0].deltaPercent.toFixed(1)}%`}
              changeTone="positive"
            />
            <KPICard
              icon={<UserPlus className="h-5 w-5 text-[var(--db-secondary)]" />}
              label={dashboardKpis[1].label}
              value={formatCompact(dashboardKpis[1].value)}
              change={`+${dashboardKpis[1].deltaPercent.toFixed(1)}%`}
              changeTone="positive"
            />
            <KPICard
              icon={<Heart className="h-5 w-5 text-[var(--db-accent-emerald)]" />}
              label={dashboardKpis[2].label}
              value={formatCompact(dashboardKpis[2].value)}
              change={`${dashboardKpis[2].deltaPercent.toFixed(1)}%`}
              changeTone="negative"
            />
            <KPICard
              icon={<MessageSquare className="h-5 w-5 text-[var(--db-accent-orange)]" />}
              label={dashboardKpis[3].label}
              value={formatCompact(dashboardKpis[3].value)}
              change={`+${dashboardKpis[3].deltaPercent.toFixed(1)}%`}
              changeTone="positive"
            />
          </section>

          <section className="grid grid-cols-1 gap-4 items-stretch lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
            <LineChartCard data={dashboardTrend} />
            <DonutChartCard segments={dashboardAudience} />
          </section>

          <section>
            <ReportsTable
              reports={dashboardReports}
              onSelectReport={(row) => {
                setSelectedReport(row);
                setDrawerOpen(true);
              }}
            />
          </section>

          <section>
            <TopPostsCard items={dashboardTopPosts} />
          </section>

          <ReportModerationDrawer
            open={drawerOpen}
            onOpenChange={(open) => {
              setDrawerOpen(open);
              if (!open) {
                setSelectedReport(null);
              }
            }}
            detail={moderationDetail}
          />
        </main>
      }
      rightPanel={<RightPanel profile={dashboardProfile} comments={dashboardComments} />}
    />
  );
};

