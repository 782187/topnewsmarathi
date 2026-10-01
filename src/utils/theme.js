import { useSyncExternalStore } from 'react';

// Site color theme. The inline script in index.html applies the saved choice
// (Light when there is none) to <html data-theme> before first paint; this
// module reads and switches that attribute. Keep THEMES and STORAGE_KEY in
// sync with it.
export const THEMES = ['white', 'light', 'dark'];
const STORAGE_KEY = 'tnm-theme';
const EVENT = 'themechange';

const root = document.documentElement;

export const getTheme = () => (THEMES.includes(root.dataset.theme) ? root.dataset.theme : 'light');

// Keep the mobile browser's address-bar color in step with the navbar surface.
export const syncThemeColorMeta = () => {
  const meta = document.querySelector('meta[name="theme-color"]');
  const surface = getComputedStyle(root).getPropertyValue('--brand-gray-dark').trim();
  if (meta && surface) meta.setAttribute('content', surface);
};

export const setTheme = (theme) => {
  if (!THEMES.includes(theme)) return;
  root.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage blocked — the theme still applies for this visit */
  }
  syncThemeColorMeta();
  window.dispatchEvent(new Event(EVENT));
};

const subscribe = (callback) => {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
};

export const useTheme = () => useSyncExternalStore(subscribe, getTheme);
