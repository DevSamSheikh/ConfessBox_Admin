'use client';

import type React from 'react';

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0B0B15] to-[#1A1333] flex flex-col xl:flex-row">
      {sidebar}
      <div className="flex-1 min-w-0">{main}</div>
      {rightPanel}
    </div>
  );
};

