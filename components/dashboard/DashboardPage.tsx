'use client';

import { Users, UserPlus, Heart, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { LineChartCard } from '@/components/dashboard/LineChartCard';
import { DonutChartCard } from '@/components/dashboard/DonutChartCard';
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
            <ReportsTable reports={dashboardReports} />
          </section>

          <section>
            <TopPostsCard items={dashboardTopPosts} />
          </section>
        </main>
      }
      rightPanel={<RightPanel profile={dashboardProfile} comments={dashboardComments} />}
    />
  );
};

