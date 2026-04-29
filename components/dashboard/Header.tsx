'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';

export const Header = ({
  profileName,
  profileInitials,
}: {
  profileName: string;
  profileInitials: string;
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="text-white text-lg font-semibold">Dashboard</div>
        <div className="text-gray-400 text-sm truncate">
          Hello {profileName}, Welcome back!
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
        <div className="relative w-full sm:w-72 lg:w-[360px]">
          <Input
            placeholder="Search"
            className="h-10 rounded-full bg-[#171526] border border-white/10 text-white placeholder:text-gray-500 pr-10"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <ThemeSwitch />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 text-gray-200"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-white/10 text-white">
                {profileInitials}
              </AvatarFallback>
            </Avatar>
            <div className="text-white text-sm font-medium">{profileName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

