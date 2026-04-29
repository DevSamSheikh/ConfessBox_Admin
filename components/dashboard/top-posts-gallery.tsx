'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';

export const TopPostsGallery = ({ items }: { items: DashboardTopPost[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
          Top Posts
        </div>
        <Button variant="ghost" className="rounded-full">
          See All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="hidden xl:block" />

      {items.map((item) => (
        <Card
          key={item.id}
          className={cn(
            'relative overflow-hidden rounded-3xl border p-5 shadow-sm',
            'bg-white/70 border-slate-200',
            'dark:bg-slate-950/40 dark:border-slate-800',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 opacity-90',
              'bg-gradient-to-br',
              item.gradientFrom,
              item.gradientTo,
            )}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent dark:from-slate-950/50"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="text-sm font-semibold text-white">{item.title}</div>
            <div className="text-sm text-white/80">{item.subtitle}</div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <div className="text-xs text-white/70">Reach</div>
                <div className="mt-1 text-lg font-semibold text-white">78K</div>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <div className="text-xs text-white/70">Engagement</div>
                <div className="mt-1 text-lg font-semibold text-white">4.6%</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

