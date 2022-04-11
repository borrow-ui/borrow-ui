import React from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';

import { MenuEntryProps } from './Menu.types';

const MENU_ENTRY_CLASS = `${UI_PREFIX}__menu__entry`;
const MENU_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__menu__entry--clickable`;
const MENU_ENTRY_DISABLED_CLASS = `${UI_PREFIX}__menu__entry--disabled`;

export const MenuEntry = ({
    children,
    onClick,
    disabled = false,
    className = '',
    ...rest
}: MenuEntryProps): JSX.Element => {
    const clickableClass = onClick !== undefined && !disabled ? MENU_ENTRY_CLICKABLE_CLASS : '';
    const disabledClass = disabled ? MENU_ENTRY_DISABLED_CLASS : '';
    const menuEntryClass =
        `${MENU_ENTRY_CLASS} ${clickableClass} ${disabledClass} ${className}`.trim();

    return (
        <div
            className={menuEntryClass}
            {...(onClick ? a11yClickableElement({ onClick }) : undefined)}
            {...rest}
        >
            {children}
        </div>
    );
};
