import React from 'react';

import { UI_PREFIX } from '../../config';

import { MenuEntry } from './MenuEntry';
import { MenuDivider } from './MenuDivider';
import { MenuProps, EntryMenuType } from './Menu.types';

const MENU_CLASS = `${UI_PREFIX}__menu`;

export const Menu = ({
    children,
    className = '',
    entries = [],
    ...rest
}: MenuProps): JSX.Element => {
    const menuClassName = `${MENU_CLASS} ${className}`.trim();

    const menuEntries: Array<JSX.Element> | null =
        entries.length > 0 ? buildMenuEntries(entries) : null;

    return (
        <div className={menuClassName} {...rest}>
            {menuEntries && menuEntries}
            {children}
        </div>
    );
};

function buildMenuEntries(entries: Array<EntryMenuType>): Array<JSX.Element> {
    return entries.map((entry, i) => {
        if (entry.type === 'divider') return <MenuDivider key={`menu-item-${i}`} />;
        return (
            <MenuEntry key={`menu-item-${i}`} {...entry.props}>
                {entry.label}
            </MenuEntry>
        );
    });
}
