'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, Edit, Star, EyeOff, Trash2, Copy, Link as LinkIcon, Scan, CheckSquare, Square } from 'lucide-react';
import * as React from 'react';
import { POST_RECORDS, STATUS_CLASS } from '../constants/post-management.constants';
import type { PostRecord } from '../types/post-management.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';
import { Badge } from '@/components/shared/ui/badge';
import { cn } from '@/lib/utils';
import { PostManagementDrawer } from './PostManagementDrawer';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

interface RecentPostsProps {
  onOpenDrawer?: () => void;
}

const PostPreviewCard = ({ post }: { post: PostRecord }) => {
  return (
    <div className="rounded-lg border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] p-3">
      <p className="line-clamp-3 text-sm text-[var(--db-text-primary)]">{post.preview}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {post.hashTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--db-overlay-soft)] px-2 py-0.5 text-[10px] text-[var(--db-text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const RecentPosts = ({ onOpenDrawer }: RecentPostsProps) => {
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [selectedBulkAction, setSelectedBulkAction] = React.useState<string>('');
  const [posts, setPosts] = React.useState<PostRecord[]>(POST_RECORDS);
  const [selectedPost, setSelectedPost] = React.useState<PostRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const total = posts.length;
  const scannedCount = posts.filter((post) => post.scanned).length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const pageRows = posts.slice(start, start + pageSize);
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + pageSize, total);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleSelectAll = () => {
    if (selectedIds.size === pageRows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pageRows.map((row) => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkAction = () => {
    if (!selectedBulkAction) return;
    
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (selectedIds.has(post.id)) {
          switch (selectedBulkAction) {
            case 'publish':
              return { ...post, visibilityStatus: 'Published' as const };
            case 'hide':
              return { ...post, visibilityStatus: 'Hidden' as const };
            case 'delete':
              return { ...post, visibilityStatus: 'Deleted' as const };
            case 'feature':
              return { ...post, visibilityStatus: 'Featured' as const };
            default:
              return post;
          }
        }
        return post;
      })
    );
    
    setSelectedIds(new Set());
    setSelectedBulkAction('');
  };

  const handleRowClick = (post: PostRecord) => {
    setSelectedPost(post);
    setDrawerOpen(true);
  };

  return (
    <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-[var(--db-text-primary)]">
          Recent Posts
        </CardTitle>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-secondary)]"
                  >
                    Bulk Actions ({selectedIds.size})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('publish')}>
                    Publish
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('hide')}>
                    Hide
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('delete')}>
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedBulkAction('feature')}>
                    Feature
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="default"
                className="h-8 text-xs"
                onClick={handleBulkAction}
                disabled={!selectedBulkAction}
              >
                Apply
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs text-[var(--db-text-secondary)] border-[var(--db-border-subtle)]"
          >
            <Scan className="mr-1 h-3 w-3" />
            {scannedCount}/{total} Scanned
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--db-text-secondary)]">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--db-border-subtle)] hover:bg-transparent">
                <TableHead className="w-[40px] text-xs font-medium text-[var(--db-text-muted)]">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center justify-center"
                  >
                    {selectedIds.size === pageRows.length && pageRows.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-[var(--db-primary)]" />
                    ) : (
                      <Square className="h-4 w-4 text-[var(--db-text-secondary)]" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="min-w-[90px] text-xs font-medium text-[var(--db-text-muted)]">
                  Post ID
                </TableHead>
                <TableHead className="min-w-[110px] text-xs font-medium text-[var(--db-text-muted)]">
                  User ID
                </TableHead>
                <TableHead className="min-w-[250px] text-xs font-medium text-[var(--db-text-muted)]">
                  Post Preview
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Category
                </TableHead>
                <TableHead className="min-w-[120px] text-xs font-medium text-[var(--db-text-muted)]">
                  Hash Tags
                </TableHead>
                <TableHead className="min-w-[60px] text-xs font-medium text-[var(--db-text-muted)]">
                  Likes
                </TableHead>
                <TableHead className="min-w-[60px] text-xs font-medium text-[var(--db-text-muted)]">
                  Comments
                </TableHead>
                <TableHead className="min-w-[60px] text-xs font-medium text-[var(--db-text-muted)]">
                  Reports
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Created
                </TableHead>
                <TableHead className="min-w-[100px] text-xs font-medium text-[var(--db-text-muted)]">
                  Status
                </TableHead>
                <TableHead className="min-w-[80px] text-right text-xs font-medium text-[var(--db-text-muted)]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-[var(--db-border-subtle)] hover:bg-[var(--db-overlay-soft)]"
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell className="w-[40px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(row.id);
                      }}
                      className="flex items-center justify-center"
                    >
                      {selectedIds.has(row.id) ? (
                        <CheckSquare className="h-4 w-4 text-[var(--db-primary)]" />
                      ) : (
                        <Square className="h-4 w-4 text-[var(--db-text-secondary)]" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className={cn(
                    'text-xs font-mono text-[var(--db-text-primary)]',
                    !row.scanned && 'bg-[rgba(239,68,68,0.15)]'
                  )}>
                    {row.id}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-[var(--db-text-secondary)]">
                    {row.anonymousUserId}
                  </TableCell>
                  <TableCell className="min-w-[250px] max-w-xs">
                    <PostPreviewCard post={row} />
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-secondary)]">
                    {row.category}
                  </TableCell>
                  <TableCell className="text-xs text-[var(--db-text-secondary)]">
                    {row.hashTags.slice(0, 2).join(', ')}
                    {row.hashTags.length > 2 && ` +${row.hashTags.length - 2}`}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-[var(--db-text-primary)]">
                    {row.likes}
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-secondary)]">
                    {row.comments}
                  </TableCell>
                  <TableCell className="text-sm text-[var(--db-text-secondary)]">
                    {row.reports}
                  </TableCell>
                  <TableCell className="text-xs text-[var(--db-text-secondary)]">
                    {row.createdTime}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('h-7 text-xs', STATUS_CLASS[row.visibilityStatus])}>
                      {row.visibilityStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Feature
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Text
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[var(--db-accent-red)]">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {total > 0 && (
        <CardFooter className="flex-col gap-4 border-t border-[var(--db-border-subtle)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-[var(--db-text-muted)] sm:text-left">
            Showing{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">
              {showingFrom}–{showingTo}
            </span>{' '}
            of{' '}
            <span className="font-medium text-[var(--db-text-secondary)]">{total}</span>
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--db-text-secondary)]">Rows per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 w-[88px] rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-2 text-xs text-[var(--db-text-secondary)]"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                onClick={goPrev}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-2 py-1 text-xs text-[var(--db-text-secondary)]">
                {page}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
                onClick={goNext}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </CardFooter>
      )}
      <PostManagementDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        post={selectedPost}
      />
    </Card>
  );
};
