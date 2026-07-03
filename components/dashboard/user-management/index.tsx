'use client';

import dynamic from 'next/dynamic';
import { Users, UserPlus, UserX, TrendingUp } from 'lucide-react';
import { UserManagementFilters } from '@/components/dashboard/user-management/components/UserManagementFilters';
import { UserManagementTable } from '@/components/dashboard/user-management/components/UserManagementTable';
import { MetricCard } from '@/components/shared/ui/MetricCard';
import { TimeToggleCard } from '@/components/shared/ui/TimeToggleCard';
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
  } = useUserManagement();

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const pendingUsers = users.filter((user) => user.status === 'Pending').length;
  const suspendedUsers = users.filter((user) => user.status === 'Suspended').length;

  return (
    <>
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-1 gap-4">
      

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Users"
            value={totalUsers}
            trend="+12.5% vs last month"
            icon={Users}
            iconColor="var(--db-text-primary)"
            iconBg="var(--db-overlay-strong)"
          />
          <MetricCard
            title="Active Users"
            value={activeUsers}
            trend={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
            icon={Users}
            iconColor="var(--db-accent-emerald)"
            iconBg="color-mix(in_srgb,var(--db-accent-emerald)_20%,transparent)"
          />
          <TimeToggleCard
            title="New Users"
            icon={UserPlus}
            iconColor="var(--db-primary)"
            iconBg="color-mix(in_srgb,var(--db-primary)_20%,transparent)"
            toggles={['Today', 'This Week', 'This Month', 'This Year']}
            values={{
              Today: 42,
              'This Week': 287,
              'This Month': 1243,
              'This Year': 15600,
            }}
            autoRotate={true}
            rotationInterval={5000}
          />
          <TimeToggleCard
            title="Suspended Users"
            icon={UserX}
            iconColor="var(--db-accent-red)"
            iconBg="color-mix(in_srgb,var(--db-accent-red)_20%,transparent)"
            toggles={['Today', 'This Week', 'This Month', 'This Year']}
            values={{
              Today: 3,
              'This Week': 12,
              'This Month': 45,
              'This Year': 128,
            }}
            autoRotate={true}
            rotationInterval={5000}
          />
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
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
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
