import { useEffect } from 'react';
import { Sun, SunDim, Moon } from 'lucide-react';
import { useTheme, setTheme, syncThemeColorMeta } from '../utils/theme';

const OPTIONS = [
  { value: 'white', label: 'व्हाइट थीम', icon: Sun },
  { value: 'light', label: 'लाइट थीम', icon: SunDim },
  { value: 'dark', label: 'डार्क थीम', icon: Moon },
];

const ThemeSwitcher = () => {
  const theme = useTheme();

  // index.html set the theme before React loaded; match the address bar to it.
  useEffect(() => {
    syncThemeColorMeta();
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="थीम निवडा"
      className="flex items-center gap-0.5 p-0.5 rounded-full border border-brand-gray-medium bg-brand-black-light"
    >
      {OPTIONS.map(({ value, label, icon }) => {
        const IconComponent = icon;
        return (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
          className={`p-1.5 rounded-full transition-colors duration-200 ${theme === value
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-brand-gray hover:text-brand-white'
            }`}
        >
          <IconComponent size={16} />
        </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
