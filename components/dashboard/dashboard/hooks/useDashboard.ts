'use client';

import * as React from 'react';
import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';
import type { ModerationReportDetail } from '@/app/dashboard/moderation-report-detail';

export const useDashboard = () => {
  const [reportDrawerOpen, setReportDrawerOpen] = React.useState(false);
  const [postDrawerOpen, setPostDrawerOpen] = React.useState(false);
  const [selectedDetail, setSelectedDetail] = React.useState<ModerationReportDetail | null>(null);
  const [selectedTopPost, setSelectedTopPost] = React.useState<DashboardTopPost | null>(null);

  return {
    reportDrawerOpen,
    setReportDrawerOpen,
    postDrawerOpen,
    setPostDrawerOpen,
    selectedDetail,
    setSelectedDetail,
    selectedTopPost,
    setSelectedTopPost,
  };
};
