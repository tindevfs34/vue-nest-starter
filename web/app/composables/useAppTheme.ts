const THEME_KEY = 'theme';
const LIGHT = 'light';
const DARK = 'dark';

export function useAppTheme() {
  const isDark = useState<boolean>('isDark', () => false);

  function applyTheme(dark: boolean) {
    const theme = LIGHT;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    isDark.value = dark;
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === DARK : prefersDark;
    applyTheme(dark);
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  return { isDark, initTheme, toggleTheme };
}
