/**
 * Dashboard Dark Theme Tokens
 * ---------------------------
 * Single source of truth for dashboard colors.
 *
 * Update any value here to change dashboard theme globally.
 * Components should consume these via CSS variables only.
 */
export const dashboardTheme = {
  // Base surfaces
  bgStart: '#0B0B15',
  bgEnd: '#1A1333',
  sidebarBg: '#0E0C1A',
  cardBg: '#12101F',
  cardElevatedBg: '#171526',
  cardGradientFrom: '#1A1830',
  cardGradientTo: '#141224',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',

  // Borders and overlays
  borderSubtle: 'rgba(255,255,255,0.10)',
  borderSoft: 'rgba(255,255,255,0.20)',
  overlaySoft: 'rgba(255,255,255,0.05)',
  overlayStrong: 'rgba(255,255,255,0.10)',
  gridLine: 'rgba(255,255,255,0.06)',
  tooltipCursor: 'rgba(255,255,255,0.12)',

  // Brand / accents
  primary: '#2F6BFF',
  primaryHover: '#1D42B8',
  secondary: '#7A3BFF',
  accentCyan: '#22D3EE',
  accentEmerald: '#34D399',
  accentOrange: '#FB923C',
  accentRed: '#F87171',

  // Line chart metric colors
  lineFollowers: '#2F6BFF',
  lineFollowing: '#7A3BFF',
  lineLikes: '#22D3EE',
  lineComments: '#FB923C',

  // Donut chart segment colors
  donutMale: '#2F6BFF',
  donutFemale: '#7A3BFF',
  donutOther: 'rgba(156,163,175,0.6)',
} as const;

/**
 * CSS variable map for inline style usage on dashboard root.
 */
export const dashboardThemeVars = {
  '--db-bg-start': dashboardTheme.bgStart,
  '--db-bg-end': dashboardTheme.bgEnd,
  '--db-sidebar-bg': dashboardTheme.sidebarBg,
  '--db-card-bg': dashboardTheme.cardBg,
  '--db-card-elevated': dashboardTheme.cardElevatedBg,
  '--db-card-grad-from': dashboardTheme.cardGradientFrom,
  '--db-card-grad-to': dashboardTheme.cardGradientTo,
  '--db-text-primary': dashboardTheme.textPrimary,
  '--db-text-secondary': dashboardTheme.textSecondary,
  '--db-text-muted': dashboardTheme.textMuted,
  '--db-border-subtle': dashboardTheme.borderSubtle,
  '--db-border-soft': dashboardTheme.borderSoft,
  '--db-overlay-soft': dashboardTheme.overlaySoft,
  '--db-overlay-strong': dashboardTheme.overlayStrong,
  '--db-grid-line': dashboardTheme.gridLine,
  '--db-tooltip-cursor': dashboardTheme.tooltipCursor,
  '--db-primary': dashboardTheme.primary,
  '--db-primary-hover': dashboardTheme.primaryHover,
  '--db-secondary': dashboardTheme.secondary,
  '--db-accent-cyan': dashboardTheme.accentCyan,
  '--db-accent-emerald': dashboardTheme.accentEmerald,
  '--db-accent-orange': dashboardTheme.accentOrange,
  '--db-accent-red': dashboardTheme.accentRed,
  '--db-line-followers': dashboardTheme.lineFollowers,
  '--db-line-following': dashboardTheme.lineFollowing,
  '--db-line-likes': dashboardTheme.lineLikes,
  '--db-line-comments': dashboardTheme.lineComments,
  '--db-donut-male': dashboardTheme.donutMale,
  '--db-donut-female': dashboardTheme.donutFemale,
  '--db-donut-other': dashboardTheme.donutOther,
} as const;
