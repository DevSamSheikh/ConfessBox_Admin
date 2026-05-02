import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Input } from '@/components/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shared/ui/select';

type UserManagementFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  locationFilter: string;
  onLocationFilterChange: (value: string) => void;
};

export const UserManagementFilters = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  locationFilter,
  onLocationFilterChange,
}: UserManagementFiltersProps) => {
  return (
    <section className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4 shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--db-text-secondary)]" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] pl-9 text-[var(--db-text-primary)] placeholder:text-[var(--db-text-secondary)]"
            placeholder="Search users by name, email, phone, ID..."
          />
        </div>

        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-[140px] border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[140px] border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={locationFilter} onValueChange={onLocationFilterChange}>
          <SelectTrigger className="w-[150px] border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="usa">USA</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
              More Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Email verified only</DropdownMenuItem>
            <DropdownMenuItem>Phone verified only</DropdownMenuItem>
            <DropdownMenuItem>2FA enabled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
          Export CSV
        </Button>
        <Button className="bg-[var(--db-primary)] text-white hover:bg-[var(--db-primary-hover)]">
          <Plus className="mr-1.5 h-4 w-4" />
          Add User
        </Button>
      </div>
    </section>
  );
};
