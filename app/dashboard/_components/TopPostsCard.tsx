'use client';

import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { MediaCard } from '@/app/dashboard/dashboard-data';
import { getMediaGradient } from '@/app/dashboard/_components/dashboard-utils';

export function TopPostsCard({ cards }: { cards: MediaCard[] }) {
  return (
    <Card className="border-gray-200/70 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-950/30">
      <CardHeader className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Top Posts
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
            See all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                'relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/60 p-4 shadow-sm transition-transform dark:border-white/10 dark:bg-gray-950/20',
                'hover:-translate-y-0.5',
              )}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100',
                  getMediaGradient(card.gradient),
                )}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    {card.tag}
                  </div>
                  <div className="h-8 w-8 rounded-2xl bg-white/70 dark:bg-gray-950/30" />
                </div>
                <div className="mt-6 text-base font-semibold text-gray-900 dark:text-gray-50">
                  {card.title}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Visual spotlight
                </div>
                <div className="mt-6 h-24 rounded-3xl bg-white/60 dark:bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

