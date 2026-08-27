import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #f6f8fb;
    --surface: #ffffff;
    --surface-muted: #f8fafc;
    --surface-subtle: #eef3f8;
    --surface-hover: #f2f6fb;
    --surface-selected: #edf5ff;

    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #6b7280;
    --text-inverse: #ffffff;

    --border: #e1e7ef;
    --border-strong: #c7d2e0;

    --primary: #1d4ed8;
    --primary-hover: #1e40af;
    --primary-soft: #eaf2ff;
    --primary-border: #bdd3ff;

    --danger: #b42318;
    --danger-hover: #8f1d15;
    --danger-text: #7a2e28;
    --danger-soft: #fff1f0;
    --danger-border: #f3b7b1;

    --success: #12704a;
    --success-soft: #e8f7ef;
    --success-border: #b7e4ca;

    --overlay: rgba(15, 23, 42, 0.54);
    --login-panel-bg: #0f2746;
    --login-panel-muted: rgba(255, 255, 255, 0.74);
    --login-panel-soft: rgba(255, 255, 255, 0.1);
    --status-online: #22c55e;
    --status-ring: 0 0 0 5px var(--success-soft);

    --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.05);
    --shadow-sm: 0 8px 24px rgba(15, 23, 42, 0.06);
    --shadow-md: 0 18px 45px rgba(15, 23, 42, 0.16);
    --transition-fast: 160ms ease;

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 10px;
    --radius-pill: 999px;

    --space-2xs: 0.25rem;
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.25rem;
    --space-xl: 1.5rem;
    --space-2xl: 2rem;
    --space-3xl: 3rem;

    --page-padding: clamp(1rem, 3vw, 2rem);
    --panel-padding: clamp(1.5rem, 5vw, 4rem);
    --modal-padding: clamp(1.25rem, 3vw, 1.75rem);
    --viewport-min-height: 100svh;

    --font-size-2xs: 0.72rem;
    --font-size-xs: 0.78rem;
    --font-size-sm: 0.86rem;
    --font-size-md: 0.9rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.15rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.45rem;
    --font-size-modal-title: clamp(1.25rem, 3vw, 1.55rem);
    --font-size-panel-title: clamp(1.7rem, 3vw, 2.25rem);
    --font-size-page-title: clamp(1.65rem, 3vw, 2.25rem);
    --font-size-display: clamp(2rem, 5vw, 3.75rem);

    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-weight-extra-bold: 800;
    --font-weight-black: 900;

    --letter-spacing-label: 0.08em;
    --letter-spacing-heading: 0.1em;

    --line-height-tight: 1;
    --line-height-title: 1.05;
    --line-height-display: 0.98;
    --line-height-heading: 1.2;
    --line-height-body: 1.5;
    --line-height-copy: 1.55;
    --line-height-loose: 1.6;
    --line-height-hero: 1.65;

    --border-width: 1px;
    --border-width-accent: 4px;
    --focus-ring-width: 3px;
    --focus-ring-offset: 2px;
    --focus-ring-offset-lg: 3px;
    --disabled-opacity: 0.55;
    --disabled-opacity-strong: 0.65;
    --spinner-duration: 0.8s;

    --control-height-sm: 2rem;
    --control-height-md: 2.4rem;
    --control-height-input: 2.55rem;
    --control-height-lg: 2.65rem;
    --control-height-xl: 3rem;

    --status-dot-size: 0.55rem;
    --checkbox-size: 1.1rem;
    --spinner-size: 1.125rem;
    --button-symbol-size: 1.55rem;
    --close-button-size: 2rem;
    --empty-mark-size: 2.5rem;
    --brand-mark-size: 3rem;

    --page-max-width: 80rem;
    --dashboard-subtitle-width: 44rem;
    --login-column-min: 22rem;
    --login-intro-min-height: 32rem;
    --login-content-max-width: 40rem;
    --login-title-max-width: 38rem;
    --login-text-max-width: 31rem;
    --modal-width: 42rem;
    --modal-max-height: min(90svh, 52rem);
    --dialog-width: 32rem;
    --loader-min-height: 12rem;
    --empty-min-height: 16rem;
    --empty-text-max-width: 34rem;
    --table-min-width: 820px;
    --table-cell-max-width: 17rem;
    --table-actions-width: 1%;
    --selector-width: 240px;
    --toolbar-column-min: 16rem;
    --form-field-min-width: 16rem;
    --detail-label-width: 8rem;
    --infinite-scroll-root-margin: 240px;
    --spinner-border-width: 2px;
    --z-modal: 10;

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
    margin: 0;
    min-height: 100%;
  }

  body {
    min-width: 320px;
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
    border: 0;
  }

  a {
    color: inherit;
  }
`;

export default GlobalStyles;
