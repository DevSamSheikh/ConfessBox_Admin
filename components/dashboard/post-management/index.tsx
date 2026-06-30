'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { PostManagementHeader } from './components/PostManagementHeader';
import { PostManagementMetrics } from './components/PostManagementMetrics';
import { TopCategories } from './components/TopCategories';
import { TopHashTags } from './components/TopHashTags';
import { RecentReports } from './components/RecentReports';
import { RecentPosts } from './components/RecentPosts';
import { ActivityAnalytics } from './components/ActivityAnalytics';

const PostManagementDrawer = dynamic(
  () =>
    import('./components/PostManagementDrawer').then(
      (module) => module.PostManagementDrawer,
    ),
  { ssr: false },
);

export const PostManagementPage = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-1 gap-4">
        <PostManagementHeader />

        <PostManagementMetrics />

        <TopCategories />

        <TopHashTags />

        <RecentReports onOpenDrawer={setDrawerOpen} />

        <RecentPosts onOpenDrawer={setDrawerOpen} />

        <ActivityAnalytics />
      </div>

      <PostManagementDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};
