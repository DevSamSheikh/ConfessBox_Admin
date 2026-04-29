'use client';

import type React from 'react';
import { dashboardThemeVars } from '@/data/config/dashboard-theme';

export const DashboardLayout = ({
  sidebar,
  main,
  rightPanel,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  rightPanel: React.ReactNode;
}) => {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[var(--db-bg-start)] to-[var(--db-bg-end)] xl:flex-row"
      style={dashboardThemeVars as React.CSSProperties}
    >
      {sidebar}
      <div className="flex-1 min-w-0">{main}</div>
      {rightPanel}
    </div>
  );
};

