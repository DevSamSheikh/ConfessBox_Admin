/**
 * Dashboard Dark Theme Tokens
 * ---------------------------
 * Single source of truth for dashboard colors.
 *
 * Update any value here to change dashboard theme globally.
 * Components should consume these via CSS variables only.
 */
export const dashboardThemeDark = {
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
 * Dashboard light palette.
 * Uses same token names so components switch automatically.
 */
export const dashboardThemeLight = {
  // Base surfaces
  bgStart: '#F6F8FF',
  bgEnd: '#EEF2FF',
  sidebarBg: '#FFFFFF',
  cardBg: '#FFFFFF',
  cardElevatedBg: '#F8FAFF',
  cardGradientFrom: '#FFFFFF',
  cardGradientTo: '#F3F6FF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',

  // Borders and overlays
  borderSubtle: 'rgba(15,23,42,0.10)',
  borderSoft: 'rgba(15,23,42,0.18)',
  overlaySoft: 'rgba(15,23,42,0.05)',
  overlayStrong: 'rgba(15,23,42,0.10)',
  gridLine: 'rgba(15,23,42,0.08)',
  tooltipCursor: 'rgba(15,23,42,0.20)',

  // Brand / accents
  primary: '#2F6BFF',
  primaryHover: '#1D42B8',
  secondary: '#7A3BFF',
  accentCyan: '#0891B2',
  accentEmerald: '#059669',
  accentOrange: '#EA580C',
  accentRed: '#DC2626',

  // Line chart metric colors
  lineFollowers: '#2F6BFF',
  lineFollowing: '#7A3BFF',
  lineLikes: '#0891B2',
  lineComments: '#EA580C',

  // Donut chart segment colors
  donutMale: '#2F6BFF',
  donutFemale: '#7A3BFF',
  donutOther: 'rgba(100,116,139,0.65)',
} as const;

/**
 * Build CSS variable map for inline style usage on dashboard root.
 */
type DashboardTheme = Record<string, string>;

export const getDashboardThemeVars = (theme: DashboardTheme) =>
  ({
    '--db-bg-start': theme.bgStart,
    '--db-bg-end': theme.bgEnd,
    '--db-sidebar-bg': theme.sidebarBg,
    '--db-card-bg': theme.cardBg,
    '--db-card-elevated': theme.cardElevatedBg,
    '--db-card-grad-from': theme.cardGradientFrom,
    '--db-card-grad-to': theme.cardGradientTo,
    '--db-text-primary': theme.textPrimary,
    '--db-text-secondary': theme.textSecondary,
    '--db-text-muted': theme.textMuted,
    '--db-border-subtle': theme.borderSubtle,
    '--db-border-soft': theme.borderSoft,
    '--db-overlay-soft': theme.overlaySoft,
    '--db-overlay-strong': theme.overlayStrong,
    '--db-grid-line': theme.gridLine,
    '--db-tooltip-cursor': theme.tooltipCursor,
    '--db-primary': theme.primary,
    '--db-primary-hover': theme.primaryHover,
    '--db-secondary': theme.secondary,
    '--db-accent-cyan': theme.accentCyan,
    '--db-accent-emerald': theme.accentEmerald,
    '--db-accent-orange': theme.accentOrange,
    '--db-accent-red': theme.accentRed,
    '--db-line-followers': theme.lineFollowers,
    '--db-line-following': theme.lineFollowing,
    '--db-line-likes': theme.lineLikes,
    '--db-line-comments': theme.lineComments,
    '--db-donut-male': theme.donutMale,
    '--db-donut-female': theme.donutFemale,
    '--db-donut-other': theme.donutOther,
  }) as const;

export const dashboardThemeVarsDark = getDashboardThemeVars(dashboardThemeDark);
export const dashboardThemeVarsLight = getDashboardThemeVars(dashboardThemeLight);
