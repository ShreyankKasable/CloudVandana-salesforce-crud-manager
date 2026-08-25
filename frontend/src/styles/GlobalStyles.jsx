import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #f4f7fb;
    --surface: #ffffff;
    --surface-muted: #eef3f8;
    --surface-strong: #dfe8f1;

    --text-primary: #17202a;
    --text-secondary: #5b6673;
    --text-muted: #7a8694;
    --text-inverse: #ffffff;

    --border: #d7e0ea;
    --border-strong: #afbccb;

    --primary: #1769aa;
    --primary-hover: #0f568d;
    --primary-soft: #e8f3fb;

    --danger: #b42318;
    --danger-hover: #961f16;
    --danger-soft: #fcebea;

    --success: #1f7a4d;
    --success-soft: #e8f6ee;

    --warning: #a65f00;
    --warning-soft: #fff4df;

    --overlay: rgba(23, 32, 42, 0.58);
    --hero-scrim: rgba(23, 32, 42, 0.18);
    --hero-gradient: linear-gradient(135deg, #17324d 0%, #1769aa 52%, #1f7a4d 100%);
    --hero-text-muted: rgba(255, 255, 255, 0.78);
    --hero-text-secondary: rgba(255, 255, 255, 0.82);
    --hero-accent: #d7ebff;
    --status-dot-login: #70d49c;
    --status-dot-login-ring: rgba(112, 212, 156, 0.18);
    --danger-text: #7a2e28;
    --danger-border-soft: rgba(180, 35, 24, 0.18);
    --danger-border: rgba(180, 35, 24, 0.25);
    --success-border-soft: rgba(31, 122, 77, 0.18);
    --table-row-hover: #f9fbfd;

    --shadow-sm: 0 1px 2px rgba(23, 32, 42, 0.06);
    --shadow-md: 0 12px 32px rgba(23, 32, 42, 0.12);
    --shadow-status-ring: 0 0 0 5px var(--success-soft);
    --shadow-login-status-ring: 0 0 0 5px var(--status-dot-login-ring);

    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --radius-round: 999px;

    --space-none: 0;
    --space-3xs: 0.25rem;
    --space-2xs: 0.35rem;
    --space-xs: 0.45rem;
    --space-sm: 0.5rem;
    --space-status-gap: 0.55rem;
    --space-checkbox-gap: 0.6rem;
    --space-empty-gap: 0.65rem;
    --space-md: 0.75rem;
    --space-button-gap: 0.8rem;
    --space-row-y: 0.85rem;
    --space-notice-y: 0.9rem;
    --space-cell-x: 0.95rem;
    --space-lg: 1rem;
    --space-error-x: 1.125rem;
    --space-login-copy-gap: 1.2rem;
    --space-xl: 1.25rem;
    --space-2xl: 1.5rem;
    --space-modal-lg: 1.75rem;
    --space-3xl: 2rem;
    --space-4xl: 3rem;

    --space-page: clamp(1.25rem, 4vw, 3rem);
    --space-login-panel: clamp(2rem, 6vw, 5rem);
    --space-modal: clamp(1.25rem, 3vw, 1.75rem);

    --font-size-2xs: 0.72rem;
    --font-size-label: 0.74rem;
    --font-size-eyebrow: 0.76rem;
    --font-size-action: 0.78rem;
    --font-size-note: 0.8rem;
    --font-size-xs: 0.82rem;
    --font-size-form: 0.86rem;
    --font-size-sm: 0.88rem;
    --font-size-base: 0.9rem;
    --font-size-md: 1rem;
    --font-size-empty-title: 1.15rem;
    --font-size-icon: 1.2rem;
    --font-size-close: 1.25rem;
    --font-size-section-title: 1.35rem;
    --font-size-dialog-title: 1.4rem;
    --font-size-modal-title: clamp(1.25rem, 3vw, 1.55rem);
    --font-size-login-panel-title: clamp(1.75rem, 4vw, 2.8rem);
    --font-size-page-title: clamp(2rem, 5vw, 3.4rem);
    --font-size-login-title: clamp(2.6rem, 6vw, 5.4rem);

    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-weight-extra-bold: 800;
    --font-weight-black: 900;

    --letter-spacing-required: 0.04em;
    --letter-spacing-label: 0.08em;
    --letter-spacing-heading: 0.1em;

    --line-height-tight: 1;
    --line-height-title: 1.05;
    --line-height-display: 0.98;
    --line-height-heading: 1.2;
    --line-height-empty-title: 1.25;
    --line-height-body-tight: 1.45;
    --line-height-body: 1.5;
    --line-height-copy: 1.55;
    --line-height-loose: 1.6;
    --line-height-hero: 1.65;

    --border-width: 1px;
    --border-width-spinner: 2px;
    --border-width-accent: 4px;
    --focus-ring-width: 3px;
    --focus-offset-sm: 2px;
    --focus-offset-md: 3px;

    --size-full: 100%;
    --size-min-viewport-width: 320px;
    --size-page-min-height: 100svh;
    --size-root-min-height: 100%;
    --size-status-dot: 0.55rem;
    --size-checkbox: 1.1rem;
    --size-spinner: 1.125rem;
    --size-button-symbol: 1.55rem;
    --size-close-button: 2rem;
    --size-empty-mark: 2.5rem;
    --size-panel-mark: 3rem;

    --control-height-sm: 2rem;
    --control-height-md: 2.5rem;
    --control-height-input: 2.65rem;
    --control-height-lg: 2.75rem;
    --control-height-login: 3.25rem;

    --layout-dashboard-max: 78rem;
    --layout-login-column-min: 22rem;
    --layout-login-intro-min-height: 34rem;
    --layout-login-copy-max: 40rem;
    --layout-login-title-max: 38rem;
    --layout-login-text-max: 31rem;
    --layout-login-panel-text-max: 22rem;
    --layout-modal-width: 42rem;
    --layout-modal-max-height: min(90svh, 52rem);
    --layout-dialog-width: 32rem;
    --layout-loader-min-height: 14rem;
    --layout-empty-min-height: 16rem;
    --layout-empty-text-max: 34rem;
    --layout-table-min-width: 760px;
    --layout-table-cell-max: 18rem;
    --layout-selector-width: 220px;
    --layout-detail-term-width: 8rem;
    --layout-detail-term-ratio: 0.8;
    --layout-detail-value-ratio: 1.4;
    --layout-auto-columns: repeat(
      auto-fit,
      minmax(min(var(--size-full), var(--layout-login-column-min)), 1fr)
    );
    --layout-flex-unit: 1;
    --layout-flex-fixed: 0 0 auto;
    --infinite-scroll-root-margin: 240px;

    --opacity-disabled: 0.55;
    --opacity-disabled-strong: 0.65;
    --animation-duration-fast: 0.8s;
    --rotation-full: 360deg;
    --table-actions-width: 1%;
    --z-modal: 10;
    --inset-fill: 0;
    --space-auto: auto;
    --background-transparent: transparent;
    --overflow-auto: auto;
    --loader-compact-min-height: auto;

    color: var(--text-primary);
    background: var(--background);
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: var(--space-none);
    min-height: var(--size-root-min-height);
  }

  body {
    min-width: var(--size-min-viewport-width);
    color: var(--text-primary);
    background: var(--background);
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    border: var(--space-none);
  }

  a {
    color: inherit;
  }
`;

export default GlobalStyles;
