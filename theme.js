/**
 * Theme Manager - Handles dark mode detection, switching, and persistence
 */
const ThemeManager = (() => {
  const STORAGE_KEY = 'tryjax-theme';
  const DATA_ATTRIBUTE = 'data-theme';

  /**
   * Determine the initial theme preference
   */
  function getInitialTheme() {
    // 1. Check localStorage first (user's explicit choice)
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // 2. Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. Default to light
    return 'light';
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute(DATA_ATTRIBUTE, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButtonText(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(DATA_ATTRIBUTE);
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  /**
   * Listen for system theme changes
   */
  function listenForSystemChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e) => {
      // Only auto-switch if user hasn't made an explicit choice
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }
  }

  /**
   * Update the toggle button text/icon based on current theme
   */
  function updateToggleButtonText(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('.icon');
      const text = toggleBtn.querySelector('.label');
      if (icon) {
        icon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
      }
      if (text) {
        text.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
    }
  }

  /**
   * Initialize the theme manager
   */
  function init() {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    listenForSystemChanges();

    // Attach click handler to toggle button
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }

  return { init };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ThemeManager.init);
} else {
  ThemeManager.init();
}
