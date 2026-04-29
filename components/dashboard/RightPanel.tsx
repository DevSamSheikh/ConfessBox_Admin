'use client';

import type { DashboardComment, DashboardProfile } from '@/app/dashboard/dashboard-data';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { CommentsList } from '@/components/dashboard/CommentsList';

export const RightPanel = ({
  profile,
  comments,
}: {
  profile: DashboardProfile;
  comments: DashboardComment[];
}) => {
  return (
    <aside className="w-full xl:w-[300px] px-4 py-5 xl:pl-2 xl:pr-4 flex flex-col gap-4">
      <ProfileCard profile={profile} />
      <CommentsList comments={comments} />
    </aside>
  );
};

