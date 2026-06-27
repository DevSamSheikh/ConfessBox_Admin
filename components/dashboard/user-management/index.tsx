'use client';

import dynamic from 'next/dynamic';
import { UserManagementFilters } from '@/components/dashboard/user-management/components/UserManagementFilters';
import { UserManagementMetricCard } from '@/components/dashboard/user-management/components/UserManagementMetricCard';
import { UserManagementTable } from '@/components/dashboard/user-management/components/UserManagementTable';
import { useUserManagement } from '@/components/dashboard/user-management/hooks/useUserManagement';

const UserManagementDrawer = dynamic(
  () =>
    import('@/components/dashboard/user-management/components/UserManagementDrawer').then(
      (module) => module.UserManagementDrawer,
    ),
  { ssr: false },
);

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
    bulkUpdateStatus,
  } = useUserManagement();

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const pendingUsers = users.filter((user) => user.status === 'Pending').length;
  const suspendedUsers = users.filter((user) => user.status === 'Suspended').length;

  return (
    <>
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-1 gap-4">
      

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
          onBulkUpdateStatus={bulkUpdateStatus}
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsersCount={sortedUsers.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <UserManagementDrawer
        activeUser={activeUser}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onUpdateStatus={updateUserStatus}
        onImpersonate={(id) => {
          void id;
        }}
        onResetPassword={(id) => {
          void id;
        }}
        onSuspend={(id) => {
          void id;
        }}
        onDelete={(id) => {
          void id;
        }}
      />
    </>
  );
};
