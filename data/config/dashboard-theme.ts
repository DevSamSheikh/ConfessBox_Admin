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

  // Elevation (use with shadow-[var(--db-shadow-card)])
  shadowCard: '0 14px 30px rgba(0, 0, 0, 0.35)',
  shadowCardHover: '0 10px 30px rgba(0, 0, 0, 0.35)',
} as const;

/**
 * Dashboard light palette.
 * Uses same token names so components switch automatically.
 */
export const dashboardThemeLight = {
  /**
   * Light dashboard: cool-neutral page, crisp cards, airy borders.
   * Slightly tinted whites so UI does not feel flat against pure white.
   */
  // Base surfaces — soft blue-gray gradient, not harsh white-grey
  bgStart: '#F4F6FA',
  bgEnd: '#E8EDF8',
  sidebarBg: '#FAFBFD',
  cardBg: '#FFFFFF',
  cardElevatedBg: '#F7F9FC',
  cardGradientFrom: '#FFFFFF',
  cardGradientTo: '#F4F7FB',

  // Text — higher contrast hierarchy; body stays readable on tinted bg
  textPrimary: '#101828',
  textSecondary: '#5C667A',
  textMuted: '#7A8499',

  // Borders — lighter touch; separators stay visible without heaviness
  borderSubtle: 'rgba(16, 24, 40, 0.08)',
  borderSoft: 'rgba(16, 24, 40, 0.14)',
  overlaySoft: 'rgba(47, 107, 255, 0.06)',
  overlayStrong: 'rgba(47, 107, 255, 0.10)',
  gridLine: 'rgba(16, 24, 40, 0.07)',
  tooltipCursor: 'rgba(16, 24, 40, 0.12)',

  // Brand — slightly richer on light backgrounds
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  secondary: '#6D36E6',
  accentCyan: '#0E7490',
  accentEmerald: '#059669',
  accentOrange: '#EA580C',
  accentRed: '#DC2626',

  // Line chart — saturated enough to read on light grid
  lineFollowers: '#2563EB',
  lineFollowing: '#7C3AED',
  lineLikes: '#0D9488',
  lineComments: '#EA580C',

  // Donut — align with brand; other segment neutral slate
  donutMale: '#2563EB',
  donutFemale: '#7C3AED',
  donutOther: 'rgba(100, 116, 139, 0.55)',

  // Elevation — soft layered shadow (material-style, not harsh black)
  shadowCard:
    '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 16px rgba(16, 24, 40, 0.07), 0 12px 32px rgba(47, 107, 255, 0.06)',
  shadowCardHover:
    '0 4px 8px rgba(16, 24, 40, 0.06), 0 12px 28px rgba(16, 24, 40, 0.1), 0 16px 40px rgba(47, 107, 255, 0.08)',
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
    '--db-shadow-card': theme.shadowCard,
    '--db-shadow-card-hover': theme.shadowCardHover,
  }) as const;

export const dashboardThemeVarsDark = getDashboardThemeVars(dashboardThemeDark);
export const dashboardThemeVarsLight = getDashboardThemeVars(dashboardThemeLight);
