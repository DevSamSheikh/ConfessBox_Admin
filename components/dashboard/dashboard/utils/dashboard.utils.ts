export const formatCompactNumber = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);
