'use client';

import { FileText, User, Calendar, Tag, Check, Eye, Trash2, OctagonPause, LayoutDashboard, Shield } from 'lucide-react';
import { GenericDrawer, type DrawerSection, type DrawerAction } from '@/components/shared/ui/GenericDrawer';
import { STATUS_CLASS } from '../constants/post-management.constants';
import type { PostRecord } from '../types/post-management.types';

interface PostManagementDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  post?: PostRecord | null;
}

export const PostManagementDrawer = ({
  open = false,
  onOpenChange,
  post,
}: PostManagementDrawerProps) => {
  if (!post) return null;

  const sections: Record<string, DrawerSection> = {
    overview: {
      title: 'Overview',
      fields: [
        { label: 'Post ID', value: post.id },
        { label: 'User ID', value: post.anonymousUserId },
        { label: 'Category', value: post.category },
        { label: 'Status', value: post.visibilityStatus },
        { label: 'Created', value: post.createdTime },
        { label: 'Scanned', value: post.scanned ? 'Yes' : 'No' },
      ],
      content: (
        <div
          style={{
            background: '#171526',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 10,
            padding: '14px',
            color: '#9CA3AF',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {post.preview}
        </div>
      ),
      actions: [
        {
          label: 'Publish',
          icon: <Check size={14} />,
          onClick: () => console.log('Publish post', post.id),
        },
        {
          label: 'Hide',
          icon: <Eye size={14} />,
          variant: 'warning',
          onClick: () => console.log('Hide post', post.id),
        },
        {
          label: 'Delete',
          icon: <Trash2 size={14} />,
          variant: 'danger',
          onClick: () => console.log('Delete post', post.id),
        },
      ],
    },
  };

  return (
    <GenericDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={post.id}
      subtitle={`Category: ${post.category}`}
      icon={<FileText size={32} color="#2F6BFF" />}
      iconBg="#171526"
      statusDotColor={post.scanned ? '#34D399' : '#FB923C'}
      contactInfo={[
        { icon: <User size={12} color="#6B7280" />, text: post.anonymousUserId, copyable: true },
      ]}
      status={{
        value: post.visibilityStatus,
        options: ['Published', 'Hidden', 'Deleted', 'Featured'],
        onChange: (value) => console.log('Status changed to', value),
      }}
      tabs={[
        { key: 'overview', label: 'Overview', icon: LayoutDashboard },
        { key: 'activity', label: 'Activity', icon: Shield },
      ]}
      sections={sections}
      notesPlaceholder="Add a note about this post..."
    />
  );
};
