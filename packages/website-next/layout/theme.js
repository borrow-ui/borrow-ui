import { useLayoutEffect, useEffect, useState, useCallback, useRef } from 'react';

import { Icon } from '@borrow-ui/ui';

const useClientLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ThemeTrigger() {
    const { theme, toggleTheme } = useThemes();
    const isDark = theme === 'dark';

    const iconClass = `m-r-10 ${isDark ? 'color-neutral-white' : 'color-dark'}`;
    7;
    return (
        <div>
            <Icon
                className={iconClass}
                name={isDark ? 'nightlight' : 'sunny'}
                onClick={() => toggleTheme('dark')}
            />
        </div>
    );
}

function useThemes({ defaultTheme = null, localStorageKey = '__website_theme' } = {}) {
    const mountedRef = useRef(false);
    const [theme, setTheme] = useState(defaultTheme);

    const toggleTheme = useCallback(
        (themeName) => {
            setTheme((currentValue) => {
                const removeTheme = themeName === currentValue;
                if (removeTheme) {
                    document.querySelector('body').removeAttribute('data-theme');
                    localStorage.removeItem(localStorageKey);
                } else {
                    document.querySelector('body').setAttribute('data-theme', themeName);
                    localStorage.setItem(localStorageKey, themeName);
                }
                return removeTheme ? null : themeName;
            });
        },
        [setTheme, localStorageKey]
    );

    useClientLayoutEffect(() => {
        if (mountedRef.current) return;

        const savedTheme = localStorage && localStorage.getItem(localStorageKey);
        toggleTheme(savedTheme);
        mountedRef.current = true;
    }, [localStorageKey, toggleTheme]);

    return { theme, setTheme, toggleTheme };
}
