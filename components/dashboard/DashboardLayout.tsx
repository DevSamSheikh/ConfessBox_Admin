'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type React from 'react';
import { useTheme } from 'next-themes';
import {
  dashboardThemeVarsDark,
  dashboardThemeVarsLight,
} from '@/data/config/dashboard-theme';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeVars = useMemo(() => {
    if (!mounted) {
      return dashboardThemeVarsDark;
    }
    return resolvedTheme === 'light' ? dashboardThemeVarsLight : dashboardThemeVarsDark;
  }, [mounted, resolvedTheme]);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[var(--db-bg-start)] to-[var(--db-bg-end)] xl:flex-row"
      style={themeVars as CSSProperties}
    >
      {sidebar}
      <div className="flex-1 min-w-0">{main}</div>
      {rightPanel}
    </div>
  );
};

