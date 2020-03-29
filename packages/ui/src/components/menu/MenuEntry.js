import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

const MENU_ENTRY_CLASS = `${UI_PREFIX}__menu__entry`;
const MENU_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__menu__entry--clickable`;
const MENU_ENTRY_DISABLED_CLASS = `${UI_PREFIX}__menu__entry--disabled`;

export function MenuEntry({ children, onClick, disabled = false }) {
    const clickableClass = onClick !== undefined && !disabled ? MENU_ENTRY_CLICKABLE_CLASS : '';
    const disabledClass = disabled ? MENU_ENTRY_DISABLED_CLASS : '';
    const menuEntryClass = `${MENU_ENTRY_CLASS} ${clickableClass} ${disabledClass}`;

    return (
        <div className={menuEntryClass} onClick={onClick}>
            {children}
        </div>
    );
}

MenuEntry.propTypes = {
    children: propTypesChildren,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};
