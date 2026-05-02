import { ArrowDownUp, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { ROLE_CLASS, STATUS_CLASS, USER_PAGE_SIZE } from '@/components/dashboard/user-management/constants/user-management.constants';
import type { SortDirection, SortField, UserRecord, UserRole, UserStatus } from '@/components/dashboard/user-management/types/user-management.types';
import { getInitials } from '@/components/dashboard/user-management/utils/user-management.utils';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shared/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shared/ui/table';
import { cn } from '@/lib/utils';

const SortableHead = ({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) => {
  const active = sortField === field;
  return (
    <TableHead>
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1 text-xs font-medium',
          active ? 'text-[var(--db-text-primary)]' : 'text-[var(--db-text-secondary)] hover:text-[var(--db-text-primary)]',
        )}
        onClick={() => onSort(field)}
      >
        {label}
        <ArrowDownUp className={cn('h-3.5 w-3.5', active && 'text-[var(--db-primary)]')} />
        {active ? <span className="text-[10px] uppercase">{sortDirection}</span> : null}
      </button>
    </TableHead>
  );
};

type UserManagementTableProps = {
  selectedIds: Set<string>;
  pagedUsers: UserRecord[];
  allVisibleSelected: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onToggleVisibleSelect: (checked: boolean) => void;
  onToggleSingleSelect: (id: string, checked: boolean) => void;
  onOpenUser: (user: UserRecord) => void;
  onUpdateRole: (id: string, role: UserRole) => void;
  onUpdateStatus: (id: string, status: UserStatus) => void;
  currentPage: number;
  totalPages: number;
  totalUsersCount: number;
  onPageChange: (nextPage: number) => void;
};

export const UserManagementTable = ({
  selectedIds,
  pagedUsers,
  allVisibleSelected,
  sortField,
  sortDirection,
  onSort,
  onToggleVisibleSelect,
  onToggleSingleSelect,
  onOpenUser,
  onUpdateRole,
  onUpdateStatus,
  currentPage,
  totalPages,
  totalUsersCount,
  onPageChange,
}: UserManagementTableProps) => {
  return (
    <section className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-3 shadow-[var(--db-shadow-card)] backdrop-blur-sm">
      {selectedIds.size > 0 ? (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[color-mix(in_srgb,var(--db-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--db-primary)_16%,transparent)] px-3 py-2">
          <p className="text-sm text-[var(--db-text-primary)]">
            {selectedIds.size} user{selectedIds.size > 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-[var(--db-border-soft)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
              Bulk Role Update
            </Button>
            <Button
              size="sm"
              className="bg-[color-mix(in_srgb,var(--db-accent-orange)_18%,transparent)] text-[var(--db-accent-orange)] hover:bg-[color-mix(in_srgb,var(--db-accent-orange)_28%,transparent)]"
            >
              Suspend Selected
            </Button>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-[var(--db-border-subtle)]">
        <Table>
          <TableHeader className="sticky top-0 bg-[var(--db-card-elevated)]/95 backdrop-blur">
            <TableRow className="border-[var(--db-border-subtle)] hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox checked={allVisibleSelected} onCheckedChange={(checked) => onToggleVisibleSelect(Boolean(checked))} />
              </TableHead>
              <SortableHead field="name" label="User" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <TableHead className="text-xs text-[var(--db-text-secondary)]">Email / Phone</TableHead>
              <SortableHead field="role" label="Role" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHead field="status" label="Status" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHead field="lastActive" label="Last Active" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHead field="location" label="Location" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHead field="joinedDate" label="Joined" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <TableHead className="text-right text-xs text-[var(--db-text-secondary)]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer border-[var(--db-border-subtle)] hover:bg-[var(--db-overlay-soft)]"
                onClick={() => onOpenUser(user)}
              >
                <TableCell onClick={(e) => e.stopPropagation()} className="align-middle">
                  <Checkbox checked={selectedIds.has(user.id)} onCheckedChange={(checked) => onToggleSingleSelect(user.id, Boolean(checked))} />
                </TableCell>
                <TableCell className="min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-[var(--db-border-soft)]">
                      <AvatarFallback className="bg-[var(--db-overlay-strong)] text-xs text-[var(--db-text-primary)]">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-[var(--db-text-primary)]">{user.name}</p>
                      <p className="text-xs text-[var(--db-text-secondary)]">{user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <p className="text-[var(--db-text-primary)]">{user.email}</p>
                    <p className="text-[var(--db-text-secondary)]">{user.phone}</p>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select value={user.role} onValueChange={(value) => onUpdateRole(user.id, value as UserRole)}>
                    <SelectTrigger className={cn('h-8 w-[120px] border', ROLE_CLASS[user.role])}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select value={user.status} onValueChange={(value) => onUpdateStatus(user.id, value as UserStatus)}>
                    <SelectTrigger className={cn('h-8 w-[130px] border', STATUS_CLASS[user.status])}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-xs text-[var(--db-text-secondary)]">{user.lastActive}</TableCell>
                <TableCell className="text-xs text-[var(--db-text-secondary)]">{user.location}</TableCell>
                <TableCell className="text-xs text-[var(--db-text-secondary)]">{user.joinedDate}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onOpenUser(user)}>Open drawer</DropdownMenuItem>
                      <DropdownMenuItem>Impersonate</DropdownMenuItem>
                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-[var(--db-accent-red)]">Suspend user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[var(--db-text-secondary)]">
          Showing {(currentPage - 1) * USER_PAGE_SIZE + 1} to {Math.min(currentPage * USER_PAGE_SIZE, totalUsersCount)} of {totalUsersCount} users
        </p>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="rounded-md border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] px-2 py-1 text-xs text-[var(--db-text-secondary)]">
            {currentPage}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-[var(--db-text-secondary)] hover:bg-[var(--db-overlay-soft)]"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
