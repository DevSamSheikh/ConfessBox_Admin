'use client';

import { Card, CardContent, CardHeader } from '@/components/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import { cn } from '@/lib/utils';
import type { DashboardRecentPost } from '@/app/dashboard/dashboard-data';

const formatNumber = (value: number) => Intl.NumberFormat('en').format(value);

export const RecentPostsTable = ({ posts }: { posts: DashboardRecentPost[] }) => {
  return (
    <Card
      className={cn(
        'rounded-3xl border shadow-sm',
        'bg-white/70 border-slate-200',
        'dark:bg-slate-950/40 dark:border-slate-800',
      )}
    >
      <CardHeader className="pb-2">
        <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
          Recent Posts
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">Post</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead className="text-right">Like</TableHead>
              <TableHead className="text-right">Comment</TableHead>
              <TableHead className="text-right">Share</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className={cn(
                  'cursor-pointer',
                  'hover:bg-slate-50/80 dark:hover:bg-slate-900/30',
                )}
              >
                <TableCell className="py-3">
                  <div
                    className={cn(
                      'h-9 w-9 rounded-2xl',
                      'bg-gradient-to-br',
                      post.thumbnail.gradientFrom,
                      post.thumbnail.gradientTo,
                    )}
                    aria-hidden="true"
                  />
                </TableCell>
                <TableCell className="py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-950 dark:text-slate-50">
                      {post.title}
                    </div>
                    <div className="truncate text-xs text-slate-600 dark:text-slate-400">
                      {post.createdAtLabel}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-slate-700 dark:text-slate-300">
                  {formatNumber(post.likes)}
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-slate-700 dark:text-slate-300">
                  {formatNumber(post.comments)}
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-slate-700 dark:text-slate-300">
                  {formatNumber(post.shares)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

