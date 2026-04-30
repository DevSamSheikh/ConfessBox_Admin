'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  MessageCircle,
  Repeat2,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Card } from '@/components/shared/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardTopPost } from '@/app/dashboard/dashboard-data';

const formatNumber = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

export const TopPostsCard = ({ items }: { items: DashboardTopPost[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const visiblePosts = useMemo(() => items.slice(0, 10), [items]);
  const showViewAllCard = items.length > 10;
  const carouselCards = useMemo(
    () => [
      ...visiblePosts.map((post) => ({ kind: 'post' as const, post })),
      ...(showViewAllCard ? [{ kind: 'seeAll' as const }] : []),
    ],
    [showViewAllCard, visiblePosts],
  );
  const maxIndex = Math.max(carouselCards.length - visibleCount, 0);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;
  const windowCards = useMemo(
    () => carouselCards.slice(currentIndex, currentIndex + visibleCount),
    [carouselCards, currentIndex, visibleCount],
  );

  const goPrevious = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
  };
  const goNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => Math.min(prev + visibleCount, maxIndex));
  };

  const cardGridClass =
    visibleCount === 1
      ? 'grid-cols-1'
      : visibleCount === 2
        ? 'grid-cols-2'
        : 'grid-cols-3';

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
        return;
      }
      if (width < 1024) {
        setVisibleCount(2);
        return;
      }
      setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(carouselCards.length - visibleCount, 0)));
  }, [carouselCards.length, visibleCount]);

  return (
    <Card className="rounded-2xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-[var(--db-text-primary)]">Top Posts</div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full border border-[var(--db-border-subtle)] text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goPrevious}
            disabled={!canScrollLeft}
            aria-label="Scroll top posts left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full border border-[var(--db-border-subtle)] text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)] hover:text-[var(--db-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goNext}
            disabled={!canScrollRight}
            aria-label="Scroll top posts right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative mt-4 overflow-visible px-1 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${currentIndex}-${visibleCount}`}
            className={cn('grid gap-4', cardGridClass)}
            initial={{ opacity: 0, x: slideDirection === 'right' ? 28 : -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === 'right' ? -28 : 28 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {windowCards.map((card, offset) => {
              const rank = currentIndex + offset + 1;
              if (card.kind === 'seeAll') {
                return (
                  <div
                    key="top-posts-see-all"
                    className={cn(
                      'relative aspect-square rounded-2xl border border-dashed border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4',
                    )}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                      <div className="text-sm text-[var(--db-text-secondary)]">Top 10 posts shown</div>
                      <Button className="rounded-full bg-[var(--db-primary)] px-5 text-[var(--db-text-primary)] hover:bg-[var(--db-primary-hover)]">
                        See All
                      </Button>
                    </div>
                  </div>
                );
              }

              const post = card.post;
              return (
                <div
                  key={post.id}
                  className={cn(
                    'relative aspect-square rounded-2xl border border-[var(--db-border-subtle)] bg-gradient-to-b from-[var(--db-card-grad-from)] to-[var(--db-card-bg)] p-4 shadow-[var(--db-shadow-card)]',
                  )}
                >
                  <div className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/3 -translate-y-1/2 rounded-md border border-[var(--db-border-subtle)] bg-gradient-to-br from-[var(--db-secondary)] to-[var(--db-primary)] p-1 text-xs font-semibold text-[var(--db-text-primary)] shadow-lg shadow-purple-900/30">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5" />
                      <span>#{rank}</span>
                    </div>
                  </div>

                  <div className="flex h-full flex-col">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--db-primary)] to-[var(--db-secondary)] text-sm font-semibold text-[var(--db-text-primary)]">
                        {post.authorName.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <div className="text-sm font-semibold text-[var(--db-text-primary)]">{post.authorName}</div>
                          <div className="text-xs text-[var(--db-text-muted)]">{post.authorHandle}</div>
                          <div className="text-xs text-[var(--db-text-muted)]">·</div>
                          <div className="text-xs text-[var(--db-text-muted)]">{post.postedAtLabel}</div>
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-3 truncate text-sm font-semibold text-[var(--db-text-primary)]">{post.heading}</h4>

                    <p className="mt-1 overflow-hidden text-xs leading-5 text-[var(--db-text-secondary)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] sm:text-sm">
                      {post.content}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3 text-xs text-[var(--db-text-secondary)]">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="h-3.5 w-3.5 text-[var(--db-primary)]" />
                        <span>{formatNumber(post.interactions)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5 text-[var(--db-secondary)]" />
                        <span>{formatNumber(post.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Repeat2 className="h-3.5 w-3.5 text-[var(--db-accent-cyan)]" />
                        <span>{formatNumber(post.shares)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-[var(--db-accent-emerald)]" />
                        <span>{formatNumber(post.views)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

