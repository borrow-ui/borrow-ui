import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { MenuEntry } from './MenuEntry';
import { MenuDivider } from './MenuDivider';

const MENU_CLASS = `${UI_PREFIX}__menu`;

export function Menu({ children, className = '', entries = [], ...rest }) {
    const menuClassName = `${MENU_CLASS} ${className}`.trim();

    const menuEntries = entries.length > 0 ? buildMenuEntries(entries) : null;

    return (
        <div className={menuClassName} {...rest}>
            {menuEntries && menuEntries}
            {children}
        </div>
    );
}

Menu.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['entry', 'divider']).isRequired,
            label: propTypesChildren,
            props: PropTypes.object,
        })
    ),
};

function buildMenuEntries(entries) {
    return entries.map((entry, i) => {
        if (entry.type === 'divider') return <MenuDivider key={`menu-item-${i}`} />;
        return (
            <MenuEntry key={`menu-item-${i}`} {...entry.props}>
                {entry.label}
            </MenuEntry>
        );
    });
}
