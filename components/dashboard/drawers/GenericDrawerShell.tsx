'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/shared/ui/sheet';
import { cn } from '@/lib/utils';

type GenericDrawerShellProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  title: string;
  description: string;
  widthClassName?: string;
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
};

export const GenericDrawerShell = ({
  open,
  onOpenChangeAction,
  title,
  description,
  widthClassName = 'sm:max-w-[480px]',
  header,
  content,
  footer,
  className,
}: GenericDrawerShellProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChangeAction}>
      <SheetContent
        side="right"
        hideClose
        overlayClassName="bg-[var(--db-overlay-strong)] backdrop-blur-sm"
        className={cn(
          'flex h-full w-full max-w-full flex-col gap-0 overflow-hidden rounded-l-2xl border-l border-border bg-background p-0 text-foreground shadow-none',
          widthClassName,
          className,
        )}
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">{description}</SheetDescription>
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
        {footer}
      </SheetContent>
    </Sheet>
  );
};

