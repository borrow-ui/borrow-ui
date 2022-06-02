import { useLayoutEffect, useState, useCallback } from 'react';

import { Icon } from '@borrow-ui/ui';

export function ThemeTrigger() {
    const { theme, toggleTheme } = useThemes();
    const isDark = theme === 'dark';

    const iconClass = `m-r-10 ${isDark ? 'color-neutral-white' : 'color-dark'}`;

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

    useLayoutEffect(() => {
        const savedTheme = localStorage && localStorage.getItem(localStorageKey);
        toggleTheme(savedTheme);
    }, [localStorageKey, toggleTheme]);

    return { theme, setTheme, toggleTheme };
}
