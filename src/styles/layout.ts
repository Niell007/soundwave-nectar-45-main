// Layout configuration constants
export const LAYOUT = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Spacing scale (in pixels)
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Grid system
  grid: {
    cols: 12,
    gutter: '2rem',
    containerPadding: '1rem',
  },

  // Breakpoints (in pixels)
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Common aspect ratios
  aspectRatios: {
    square: '1/1',
    video: '16/9',
    portrait: '3/4',
    widescreen: '21/9',
  },
} as const;

// CSS Grid templates for common layouts
export const GRID_TEMPLATES = {
  // Main app layout
  app: {
    areas: `
      "header header header"
      "nav main aside"
      "footer footer footer"
    `,
    columns: '250px 1fr 250px',
    rows: 'auto 1fr auto',
  },

  // Dashboard layout
  dashboard: {
    areas: `
      "sidebar header header"
      "sidebar main main"
      "sidebar main main"
    `,
    columns: '280px 1fr',
    rows: 'auto 1fr',
  },

  // Content layout with sidebar
  content: {
    areas: `
      "content sidebar"
      "content sidebar"
    `,
    columns: '1fr 350px',
    rows: '1fr',
  },
} as const;

// Flexbox patterns for common component layouts
export const FLEX_PATTERNS = {
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  between: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  start: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  end: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
} as const;

// Common margin and padding combinations
export const SPACING_PATTERNS = {
  section: {
    padding: `${LAYOUT.spacing[16]} 0`,
  },
  container: {
    padding: `0 ${LAYOUT.spacing[4]}`,
  },
  card: {
    padding: LAYOUT.spacing[6],
  },
  stack: {
    marginBottom: LAYOUT.spacing[4],
  },
  inline: {
    marginRight: LAYOUT.spacing[4],
  },
} as const;

// Responsive layout utilities
interface StylesByBreakpoint {
  [breakpoint: string]: {
    [property: string]: string | number;
  };
}

export const createResponsiveStyles = (styles: StylesByBreakpoint) => {
  const breakpointKeys = Object.keys(LAYOUT.breakpoints);
  return breakpointKeys.reduce((acc, breakpoint) => {
    const value = LAYOUT.breakpoints[breakpoint as keyof typeof LAYOUT.breakpoints];
    if (value === 0) {
      return { ...acc, ...styles[breakpoint] };
    }
    return {
      ...acc,
      [`@media (min-width: ${value}px)`]: styles[breakpoint],
    };
  }, {});
};

// Layout utility functions
export const getSpacing = (value: keyof typeof LAYOUT.spacing) => LAYOUT.spacing[value];
export const getBreakpoint = (value: keyof typeof LAYOUT.breakpoints) => `${LAYOUT.breakpoints[value]}px`;
export const getZIndex = (value: keyof typeof LAYOUT.zIndex) => LAYOUT.zIndex[value];
export const getAspectRatio = (value: keyof typeof LAYOUT.aspectRatios) => LAYOUT.aspectRatios[value];
