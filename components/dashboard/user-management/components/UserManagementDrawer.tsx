import { AlertTriangle, Clock3, Laptop, MapPin, Phone, Shield, ShieldAlert, ShieldCheck, Smartphone, Trash2, UserCog, UserRound } from 'lucide-react';
import { ROLE_CLASS, STATUS_CLASS } from '@/components/dashboard/user-management/constants/user-management.constants';
import type { UserRecord } from '@/components/dashboard/user-management/types/user-management.types';
import { getInitials } from '@/components/dashboard/user-management/utils/user-management.utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/shared/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/shared/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Label } from '@/components/shared/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/shared/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/ui/tabs';
import { cn } from '@/lib/utils';

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-base font-semibold text-[var(--db-text-primary)]">{value}</p>
    </CardContent>
  </Card>
);

const UserDrawerContent = ({ user }: { user: UserRecord }) => {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-14 w-14 border border-[var(--db-border-soft)]">
            <AvatarFallback className="bg-[var(--db-overlay-strong)] text-sm font-semibold text-[var(--db-text-primary)]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-[var(--db-text-primary)]">{user.name}</h3>
              <Badge className={cn('border', STATUS_CLASS[user.status])}>{user.status}</Badge>
            </div>
            <p className="mt-0.5 truncate text-xs text-[var(--db-text-secondary)]">{user.id}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--db-text-secondary)]">
              <span className="inline-flex items-center gap-1">
                <UserRound className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                {user.phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-1">
          {['Overview', 'Location & Devices', 'Activity Timeline', 'Security', 'Permissions', 'Risk & Flags'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}
              className="text-xs data-[state=active]:bg-[color-mix(in_srgb,var(--db-primary)_20%,transparent)] data-[state=active]:text-[var(--db-text-primary)]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-2">
            <MetricCard title="Role" value={user.role} />
            <MetricCard title="Status" value={user.status} />
            <MetricCard title="Last Active" value={user.lastActive} />
            <MetricCard title="Total Sessions" value={`${user.sessions}`} />
            <MetricCard title="Email Verified" value={user.emailVerified ? 'Yes' : 'No'} />
            <MetricCard title="Phone Verified" value={user.phoneVerified ? 'Yes' : 'No'} />
          </div>
        </TabsContent>

        <TabsContent value="location-devices">
          <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
            <CardContent className="space-y-3 p-4 text-sm text-[var(--db-text-secondary)]">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--db-primary)]" />
                Current location: {user.location}
              </p>
              <p className="inline-flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                Browser: Chrome 136 • OS: Windows 11
              </p>
              <p className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Device fingerprint: {user.id.toLowerCase()}-a81b
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity-timeline">
          <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
            <CardContent className="space-y-4 p-4">
              {['Signed in from New York', 'Viewed analytics', 'Updated profile preferences', 'Created 2 posts and 11 comments'].map((event, idx) => (
                <div key={event} className="flex gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--db-primary)]" />
                  <div>
                    <p className="text-sm text-[var(--db-text-primary)]">{event}</p>
                    <p className="text-xs text-[var(--db-text-secondary)]">{idx + 1}h ago</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
            <CardContent className="space-y-3 p-4 text-sm text-[var(--db-text-secondary)]">
              <p className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--db-accent-emerald)]" />
                2FA enabled
              </p>
              <p className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Last password reset: 37 days ago
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
            <CardContent className="space-y-3 p-4">
              <div className="grid grid-cols-2 gap-2">
                <Label className="text-[var(--db-text-secondary)]">Role</Label>
                <Badge className={cn('w-fit border', ROLE_CLASS[user.role])}>{user.role}</Badge>
                <Label className="text-[var(--db-text-secondary)]">Admin rights</Label>
                <p className="text-sm text-[var(--db-text-primary)]">{user.role === 'Admin' ? 'Granted' : 'Limited'}</p>
                <Label className="text-[var(--db-text-secondary)]">API Access</Label>
                <p className="text-sm text-[var(--db-text-primary)]">{user.role === 'Admin' ? 'Full' : 'Read only'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-flags">
          <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)]">
            <CardContent className="space-y-3 p-4">
              <Alert className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)]">
                <ShieldAlert className="h-4 w-4 text-[var(--db-accent-orange)]" />
                <AlertTitle className="text-[var(--db-text-primary)]">Fraud Score: {user.fraudScore}%</AlertTitle>
                <AlertDescription className="text-[var(--db-text-secondary)]">AI confidence suggests moderate risk; monitor unusual activity.</AlertDescription>
              </Alert>
              <Alert className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)]">
                <AlertTriangle className="h-4 w-4 text-[var(--db-accent-red)]" />
                <AlertTitle className="text-[var(--db-text-primary)]">Spam Risk: {user.spamRisk}%</AlertTitle>
                <AlertDescription className="text-[var(--db-text-secondary)]">2 recent reports in the last 7 days.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] p-4">
        <h4 className="text-sm font-semibold text-[var(--db-text-primary)]">Quick Actions</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="border-[var(--db-border-soft)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
            <UserCog className="mr-1.5 h-3.5 w-3.5" />
            Impersonate User
          </Button>
          <Button size="sm" variant="outline" className="border-[var(--db-border-soft)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Reset Password
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[color-mix(in_srgb,var(--db-accent-orange)_18%,transparent)] text-[var(--db-accent-orange)] hover:bg-[color-mix(in_srgb,var(--db-accent-orange)_28%,transparent)]"
              >
                Suspend User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
              <AlertDialogHeader>
                <AlertDialogTitle>Suspend user?</AlertDialogTitle>
                <AlertDialogDescription>This user will lose access until manually reactivated.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-[var(--db-border-soft)] bg-transparent text-[var(--db-text-primary)]">Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-[var(--db-accent-orange)] text-white hover:opacity-90">Confirm suspend</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Delete User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-primary)]">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete user permanently?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. All linked records may become orphaned.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-[var(--db-border-soft)] bg-transparent text-[var(--db-text-primary)]">Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-[var(--db-accent-red)] text-white hover:opacity-90">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
};

type UserManagementDrawerProps = {
  activeUser: UserRecord | null;
  open: boolean;
  onOpenChange: (next: boolean) => void;
};

export const UserManagementDrawer = ({ activeUser, open, onOpenChange }: UserManagementDrawerProps) => {
  return (
    <Sheet open={open && activeUser !== null} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName="bg-[color-mix(in_srgb,var(--db-bg-start)_70%,black)]"
        className="w-full border-l border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] p-0 text-[var(--db-text-primary)] shadow-[var(--db-shadow-card-hover)] backdrop-blur-md sm:max-w-[520px]"
      >
        <SheetTitle className="sr-only">User Management Drawer</SheetTitle>
        <SheetDescription className="sr-only">User details and risk controls in tabbed sections.</SheetDescription>
        {activeUser ? (
          <div className="h-full overflow-y-auto p-4">
            <UserDrawerContent user={activeUser} />
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
