import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #f4f7fb;
    --surface: #ffffff;
    --surface-muted: #eef3f8;
    --surface-hover: #f9fbfd;

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
    --danger-text: #7a2e28;
    --danger-soft: #fcebea;
    --danger-border: rgba(180, 35, 24, 0.25);

    --success: #1f7a4d;
    --success-soft: #e8f6ee;
    --success-border: rgba(31, 122, 77, 0.18);

    --overlay: rgba(23, 32, 42, 0.58);
    --hero-gradient: linear-gradient(135deg, #17324d 0%, #1769aa 52%, #1f7a4d 100%);
    --hero-scrim: rgba(23, 32, 42, 0.18);
    --hero-text-muted: rgba(255, 255, 255, 0.78);
    --hero-text-secondary: rgba(255, 255, 255, 0.82);
    --hero-accent: #d7ebff;
    --status-online: #70d49c;

    --shadow-sm: 0 1px 2px rgba(23, 32, 42, 0.06);
    --shadow-md: 0 12px 32px rgba(23, 32, 42, 0.12);

    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --radius-pill: 999px;

    --space-2xs: 0.25rem;
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.25rem;
    --space-xl: 1.5rem;
    --space-2xl: 2rem;
    --space-3xl: 3rem;

    --page-padding: clamp(1.25rem, 4vw, 3rem);
    --panel-padding: clamp(2rem, 6vw, 5rem);
    --modal-padding: clamp(1.25rem, 3vw, 1.75rem);

    --font-size-2xs: 0.72rem;
    --font-size-xs: 0.78rem;
    --font-size-sm: 0.86rem;
    --font-size-md: 0.9rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.15rem;
    --font-size-xl: 1.35rem;
    --font-size-2xl: 1.4rem;
    --font-size-modal-title: clamp(1.25rem, 3vw, 1.55rem);
    --font-size-panel-title: clamp(1.75rem, 4vw, 2.8rem);
    --font-size-page-title: clamp(2rem, 5vw, 3.4rem);
    --font-size-display: clamp(2.6rem, 6vw, 5.4rem);

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
    --control-height-md: 2.5rem;
    --control-height-input: 2.65rem;
    --control-height-lg: 2.75rem;
    --control-height-xl: 3.25rem;

    --status-dot-size: 0.55rem;
    --checkbox-size: 1.1rem;
    --spinner-size: 1.125rem;
    --button-symbol-size: 1.55rem;
    --close-button-size: 2rem;
    --empty-mark-size: 2.5rem;
    --brand-mark-size: 3rem;

    --page-max-width: 78rem;
    --login-column-min: 22rem;
    --login-intro-min-height: 34rem;
    --login-content-max-width: 40rem;
    --login-title-max-width: 38rem;
    --login-text-max-width: 31rem;
    --modal-width: 42rem;
    --modal-max-height: min(90svh, 52rem);
    --dialog-width: 32rem;
    --loader-min-height: 14rem;
    --empty-min-height: 16rem;
    --empty-text-max-width: 34rem;
    --table-min-width: 760px;
    --table-cell-max-width: 18rem;
    --selector-width: 220px;
    --detail-label-width: 8rem;
    --infinite-scroll-root-margin: 240px;
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
