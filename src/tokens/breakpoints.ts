// Breakpoints for StyleX media queries
// These must be plain strings to be used as object keys in stylex.create()
export const breakpoints = {
  xs: '@media (min-width: 0px)',     // Mobile, 1 col
  sm: '@media (min-width: 640px)',   // Large mobile
  md: '@media (min-width: 768px)',   // Tablet, 6 col
  lg: '@media (min-width: 1024px)',  // Desktop, 12 col
  xl: '@media (min-width: 1280px)',  // Wide, container 1160
};

