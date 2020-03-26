import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

// import 'style/components/sidebarMenu/sidebarMenu.scss';

const SIDEBAR_MENU_CLASS = `${UI_PREFIX}__sidebar-menu`;
const SIDEBAR_MENU_PADDED_CLASS = `${UI_PREFIX}__sidebar-menu--padded`;
const SIDEBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__sidebar-menu__title`;
const SIDEBAR_MENU_ENTRY_CLASS = `${UI_PREFIX}__sidebar-menu__entry`;
const SIDEBAR_MENU_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--active`;
const SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--clickable`;
const SIDEBAR_MENU_SEPARATOR_CLASS = `${UI_PREFIX}__sidebar-menu__separator`;

export function SidebarMenu({ children, isPadded = true }) {
    const paddedClass = isPadded ? SIDEBAR_MENU_PADDED_CLASS : '';
    const sidebarMenuClass = `${SIDEBAR_MENU_CLASS} ${paddedClass}`;

    return <div className={sidebarMenuClass}>{children}</div>;
}

SidebarMenu.propTypes = {
    children: propTypesChildren,
    isPadded: PropTypes.bool,
};

SidebarMenu.Title = SidebarMenuTitle;
SidebarMenu.Entry = SidebarMenuEntry;
SidebarMenu.Separator = SidebarMenuSeparator;

function SidebarMenuTitle({ children }) {
    return <div className={SIDEBAR_MENU_TITLE_CLASS}>{children}</div>;
}

SidebarMenuTitle.propTypes = {
    children: propTypesChildren,
};

function SidebarMenuEntry({ isActive, onClick, children, tag: Tag = 'div', ...rest }) {
    const activeClass = isActive ? SIDEBAR_MENU_ENTRY_ACTIVE_CLASS : '';
    const clickableClass = onClick ? SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS : '';
    const entryClass = `${SIDEBAR_MENU_ENTRY_CLASS} ${activeClass} ${clickableClass}`;

    return (
        <Tag className={entryClass} onClick={onClick} {...rest}>
            {children}
        </Tag>
    );
}

SidebarMenuEntry.propTypes = {
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: propTypesChildren,
};

function SidebarMenuSeparator() {
    return <div className={SIDEBAR_MENU_SEPARATOR_CLASS}></div>;
}
