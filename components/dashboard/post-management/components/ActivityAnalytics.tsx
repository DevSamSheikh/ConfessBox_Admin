'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysInMonth = 30;
  const data: { name: string; data: { x: number; y: number }[] }[] = [];

  for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    const seriesData: { x: number; y: number }[] = [];
    for (let date = 1; date <= daysInMonth; date++) {
      const x = date;
      const y = Math.floor(Math.random() * 100) + 10;
      seriesData.push({ x, y });
    }
    data.push({
      name: days[dayIndex],
      data: seriesData,
    });
  }

  return data;
};

const MonthlyHeatmap = () => {
  const [series, setSeries] = React.useState(generateHeatmapData());
  const [options, setOptions] = React.useState({
    chart: {
      height: 350,
      type: 'heatmap' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      pan: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['rgb(99,102,241)'],
    xaxis: {
      type: 'category',
      title: {
        text: 'Day of Month',
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val: string) => `Day ${val}`,
        style: {
          colors: Array(30).fill('var(--db-text-primary)'),
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Day of Week',
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val: string) => val,
        style: {
          colors: Array(7).fill('var(--db-text-primary)'),
          fontSize: '11px',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} posts`,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 25, color: '#E0E7FF', name: 'Very Low' },
            { from: 26, to: 40, color: '#C7D2FE', name: 'Low' },
            { from: 41, to: 55, color: '#A5B4FC', name: 'Medium' },
            { from: 56, to: 70, color: '#818CF8', name: 'High' },
            { from: 71, to: 85, color: '#6366F1', name: 'Very High' },
            { from: 86, to: 110, color: '#4F46E5', name: 'Extreme' },
          ],
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom' as const,
    },
  });

  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--db-primary)_20%,transparent)]">
            <Clock className="h-4 w-4 text-[var(--db-primary)]" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-[var(--db-text-primary)]">
              Monthly Post Activity
            </CardTitle>
            <p className="text-xs text-[var(--db-text-secondary)]">
              Visualize posting activity across days of the month
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div id="heatmap-chart">
          {typeof window !== 'undefined' && (
            <ReactApexChart options={options} series={series} type="heatmap" height={350} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const ActivityAnalytics = () => {
  return <MonthlyHeatmap />;
};
