'use client';

import * as React from 'react';
import { USER_PAGE_SIZE, USER_PAGE_SIZE_OPTIONS, USERS } from '@/components/dashboard/user-management/constants/user-management.constants';
import type {
  SortDirection,
  SortField,
  UserRecord,
  UserRole,
  UserStatus,
} from '@/components/dashboard/user-management/types/user-management.types';
import { isUserInLocationBucket } from '@/components/dashboard/user-management/utils/user-management.utils';

export const useUserManagement = () => {
  const [users, setUsers] = React.useState<UserRecord[]>(USERS);
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<string>('all');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [locationFilter, setLocationFilter] = React.useState<string>('all');
  const [sortField, setSortField] = React.useState<SortField>('joinedDate');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(USER_PAGE_SIZE);
  const [activeUser, setActiveUser] = React.useState<UserRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const query = search.trim().toLowerCase();
      const searchHit =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query);
      const roleHit = roleFilter === 'all' || user.role === roleFilter;
      const statusHit = statusFilter === 'all' || user.status === statusFilter;
      const locationHit = isUserInLocationBucket(user, locationFilter);
      return searchHit && roleHit && statusHit && locationHit;
    });
  }, [users, search, roleFilter, statusFilter, locationFilter]);

  const sortedUsers = React.useMemo(() => {
    const list = [...filteredUsers];
    list.sort((a, b) => {
      const aValue = String(a[sortField]);
      const bValue = String(b[sortField]);
      const cmp = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [filteredUsers, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  const pagedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortDirection('asc');
  };

  const allVisibleSelected = pagedUsers.length > 0 && pagedUsers.every((u) => selectedIds.has(u.id));

  const toggleSelectVisible = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        pagedUsers.forEach((user) => next.add(user.id));
      } else {
        pagedUsers.forEach((user) => next.delete(user.id));
      }
      return next;
    });
  };

  const toggleSingleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const updateUserRole = (id: string, role: UserRole) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  const updateUserStatus = (id: string, status: UserStatus) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status } : user)));
    setActiveUser((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const bulkUpdateStatus = (status: UserStatus) => {
    if (selectedIds.size === 0) {
      return;
    }
    setUsers((prev) =>
      prev.map((user) => (selectedIds.has(user.id) ? { ...user, status } : user)),
    );
    setActiveUser((prev) => (prev && selectedIds.has(prev.id) ? { ...prev, status } : prev));
    setSelectedIds(new Set());
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return {
    users,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    locationFilter,
    setLocationFilter,
    sortField,
    sortDirection,
    toggleSort,
    selectedIds,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageSizeChange,
    activeUser,
    setActiveUser,
    drawerOpen,
    setDrawerOpen,
    sortedUsers,
    pagedUsers,
    totalPages,
    allVisibleSelected,
    toggleSelectVisible,
    toggleSingleSelect,
    updateUserRole,
    updateUserStatus,
    bulkUpdateStatus,
  };
};
