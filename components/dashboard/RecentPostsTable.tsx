'use client';

import { Card } from '@/components/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import type { DashboardRecentPost } from '@/app/dashboard/dashboard-data';

const formatNumber = (value: number) => Intl.NumberFormat('en').format(value);

export const RecentPostsTable = ({ posts }: { posts: DashboardRecentPost[] }) => {
  return (
    <Card className="rounded-2xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[var(--db-text-primary)] text-lg font-semibold">Recent Posts</div>
        <div className="text-[var(--db-text-muted)] text-xs">26 Sep 2024</div>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--db-border-subtle)] hover:bg-transparent">
              <TableHead className="text-[var(--db-text-muted)] text-xs">Post Image</TableHead>
              <TableHead className="text-[var(--db-text-muted)] text-xs">Create Date</TableHead>
              <TableHead className="text-[var(--db-text-muted)] text-xs text-right">
                Like
              </TableHead>
              <TableHead className="text-[var(--db-text-muted)] text-xs text-right">
                Comment
              </TableHead>
              <TableHead className="text-[var(--db-text-muted)] text-xs text-right">
                Share
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="border-[var(--db-border-subtle)] hover:bg-[var(--db-overlay-soft)]"
              >
                <TableCell className="py-3">
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${post.thumbnail.gradientFrom} ${post.thumbnail.gradientTo}`}
                  />
                </TableCell>
                <TableCell className="py-3">
                  <div className="text-[var(--db-text-secondary)] text-sm">{post.createdAtLabel}</div>
                </TableCell>
                <TableCell className="py-3 text-right text-[var(--db-text-secondary)] text-sm">
                  {formatNumber(post.likes)}
                </TableCell>
                <TableCell className="py-3 text-right text-[var(--db-text-secondary)] text-sm">
                  {formatNumber(post.comments)}
                </TableCell>
                <TableCell className="py-3 text-right text-[var(--db-text-secondary)] text-sm">
                  {formatNumber(post.shares)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

