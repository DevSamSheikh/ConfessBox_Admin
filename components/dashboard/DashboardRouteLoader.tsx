import { cn } from '@/lib/utils';

type DashboardRouteLoaderProps = {
  label?: string;
  compact?: boolean;
};

export const DashboardRouteLoader = ({
  label = 'Loading dashboard...',
  compact = true,
}: DashboardRouteLoaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full animate-[fade-in-down-fast_0.35s_ease-out_forwards] items-center justify-center opacity-0',
        compact ? 'min-h-[52vh] py-10' : 'min-h-[70vh] px-4 py-8',
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <span className="absolute -inset-6 rounded-full bg-[color-mix(in_srgb,var(--db-primary)_22%,transparent)] blur-2xl animate-pulse" />
          <span className="absolute -inset-2 rounded-full bg-[color-mix(in_srgb,var(--db-secondary)_18%,transparent)] blur-xl animate-pulse [animation-delay:300ms]" />

          <div className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[var(--db-border-soft)]" />
            <span className="absolute inset-1 rounded-full border-2 border-transparent border-t-[var(--db-primary)] border-r-[var(--db-secondary)] animate-spin [animation-duration:1.1s]" />
            <span className="absolute inset-3 rounded-full border border-[color-mix(in_srgb,var(--db-secondary)_35%,transparent)] animate-spin [animation-duration:1.8s] [animation-direction:reverse]" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--db-primary)] to-[var(--db-secondary)] shadow-[0_10px_30px_rgba(47,107,255,0.35)]">
              <span className="text-lg font-bold tracking-tight text-white">C</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold text-[var(--db-text-primary)]">{label}</p>
          <p className="text-xs text-[var(--db-text-secondary)]">Preparing your workspace</p>

          <div className="relative h-1.5 w-44 overflow-hidden rounded-full bg-[var(--db-overlay-strong)]">
            <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-[var(--db-primary)] via-[var(--db-secondary)] to-[var(--db-primary)] animate-[db-loader-shimmer_1.35s_ease-in-out_infinite]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--db-primary)] animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--db-secondary)] animate-bounce [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--db-accent-cyan)] animate-bounce [animation-delay:240ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};
