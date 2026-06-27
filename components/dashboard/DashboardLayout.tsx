'use client';

import { useMemo, type CSSProperties } from 'react';
import type React from 'react';
import { useTheme } from 'next-themes';
import {
  dashboardThemeVarsDark,
  dashboardThemeVarsLight,
} from '@/data/config/dashboard-theme';
import { Toaster } from '@/components/shared/ui/sonner';

export const DashboardLayout = ({
  sidebar,
  main,
  rightPanel,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  rightPanel: React.ReactNode;
}) => {
  const { resolvedTheme } = useTheme();

  const themeVars = useMemo(() => {
    return resolvedTheme === 'light' ? dashboardThemeVarsLight : dashboardThemeVarsDark;
  }, [resolvedTheme]);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[var(--db-bg-start)] to-[var(--db-bg-end)] xl:flex-row"
      style={themeVars as CSSProperties}
      suppressHydrationWarning
    >
      {sidebar}
      <div className="flex-1 min-w-0">{main}</div>
      {rightPanel}
      <Toaster richColors position="top-center" />
    </div>
  );
};

