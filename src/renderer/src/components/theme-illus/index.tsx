const LightTheme = () => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect x="0.5" y="0.5" width="119" height="59" rx="3.5" fill="#F9FAFB"></rect>
    <circle cx="19" cy="19" r="7" fill="#E1E6ED"></circle>
    <circle cx="19" cy="41" r="7" fill="#E1E6ED"></circle>
    <rect x="30" y="12" width="78" height="14" rx="2" fill="#E1E6ED"></rect>
    <rect opacity="0.6" x="30" y="34" width="78" height="14" rx="2" fill="#5B89FE"></rect>
  </svg>
);

const DarkTheme = () => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="4" fill="#232D47"></rect>
    <circle cx="19" cy="17" r="7" fill="#7A8599"></circle>
    <circle cx="19" cy="39" r="7" fill="#7A8599"></circle>
    <rect x="30" y="10" width="78" height="14" rx="2" fill="#7A8599"></rect>
    <rect opacity="0.6" x="30" y="32" width="78" height="14" rx="2" fill="#5B89FE"></rect>
  </svg>
);

const ThemeIllus = { LightTheme, DarkTheme };

export default ThemeIllus;
