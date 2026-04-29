'use client';

import { Card } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';

export const TopPostsCard = ({ items }: { items: DashboardTopPost[] }) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#12101F] p-5">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-semibold">Top Posts</div>
        <Button variant="ghost" className="hover:bg-white/10 text-gray-300">
          See All
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {items.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className={`h-[190px] rounded-2xl bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} flex items-end p-4`}
          >
            <div className="text-white">
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="text-xs text-white/80">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

