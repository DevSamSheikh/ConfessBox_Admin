'use client';

import { X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet';
import { Button } from '@/components/shared/ui/button';

interface PostManagementDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PostManagementDrawer = ({
  open = false,
  onOpenChange,
}: PostManagementDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] border-l border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle className="text-lg font-semibold text-[var(--db-text-primary)]">
            Post Details
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
            onClick={() => onOpenChange?.(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="mt-4 text-center text-sm text-[var(--db-text-secondary)]">
          Post details drawer coming soon
        </div>
      </SheetContent>
    </Sheet>
  );
};
