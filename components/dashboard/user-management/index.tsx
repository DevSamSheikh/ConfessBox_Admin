'use client';

import { UserManagementFilters } from '@/components/dashboard/user-management/components/UserManagementFilters';
import { UserManagementMetricCard } from '@/components/dashboard/user-management/components/UserManagementMetricCard';
import { UserManagementDrawer } from '@/components/dashboard/user-management/components/UserManagementDrawer';
import { UserManagementTable } from '@/components/dashboard/user-management/components/UserManagementTable';
import { useUserManagement } from '@/components/dashboard/user-management/hooks/useUserManagement';

export const UserManagementPage = () => {
  const {
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
  } = useUserManagement();

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const pendingUsers = users.filter((user) => user.status === 'Pending').length;
  const suspendedUsers = users.filter((user) => user.status === 'Suspended').length;

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-br from-[var(--db-bg-start)] to-[var(--db-bg-end)] px-4 py-4 text-[var(--db-text-primary)] sm:px-6 sm:py-6">
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-1 gap-4">
        <UserManagementFilters
          search={search}
          onSearchChange={setSearch}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
        />

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <UserManagementMetricCard title="Total Users" value={totalUsers.toLocaleString()} trend="+12.5% vs last month" />
          <UserManagementMetricCard
            title="Active Users"
            value={activeUsers.toLocaleString()}
            trend={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
          />
          <UserManagementMetricCard title="New This Month" value={pendingUsers.toLocaleString()} trend="8.2% vs last month" />
          <UserManagementMetricCard title="Suspended Users" value={suspendedUsers.toLocaleString()} trend="Requires review" />
        </section>

        <UserManagementTable
          selectedIds={selectedIds}
          pagedUsers={pagedUsers}
          allVisibleSelected={allVisibleSelected}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={toggleSort}
          onToggleVisibleSelect={toggleSelectVisible}
          onToggleSingleSelect={toggleSingleSelect}
          onOpenUser={(user) => {
            setActiveUser(user);
            setDrawerOpen(true);
          }}
          onUpdateRole={updateUserRole}
          onUpdateStatus={updateUserStatus}
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsersCount={sortedUsers.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <UserManagementDrawer activeUser={activeUser} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
};
