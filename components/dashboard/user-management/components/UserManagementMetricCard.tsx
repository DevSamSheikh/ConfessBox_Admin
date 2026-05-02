import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';

export const UserManagementMetricCard = ({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend?: string;
}) => (
  <Card className="rounded-xl border border-[var(--db-border-subtle)] bg-[var(--db-card-bg)] shadow-[var(--db-shadow-card)] backdrop-blur-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-xs font-medium text-[var(--db-text-secondary)]">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-semibold tracking-tight text-[var(--db-text-primary)]">{value}</p>
      {trend ? <p className="mt-1 text-xs text-[var(--db-text-secondary)]">{trend}</p> : null}
    </CardContent>
  </Card>
);
