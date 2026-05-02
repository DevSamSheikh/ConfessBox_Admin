export const DashboardRouteLoader = ({ label = 'Loading dashboard...' }: { label?: string }) => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-8">
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-20 w-20">
          <span className="absolute inset-0 rounded-full border border-indigo-300/30" />
          <span className="absolute inset-2 rounded-full border-2 border-transparent border-t-indigo-400 border-r-violet-400 animate-spin" />
          <span className="absolute inset-5 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 blur-sm animate-pulse" />
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-300 shadow-[0_0_14px_rgba(129,140,248,0.9)]" />
        </div>
        <p className="text-sm font-medium text-slate-300">{label}</p>
      </div>
    </div>
  );
};
