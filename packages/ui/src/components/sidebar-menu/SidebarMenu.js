import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren, propTypesTag } from '../../utils/types';

// import 'style/components/sidebarMenu/sidebarMenu.scss';

const SIDEBAR_MENU_CLASS = `${UI_PREFIX}__sidebar-menu`;
const SIDEBAR_MENU_PADDED_CLASS = `${UI_PREFIX}__sidebar-menu--padded`;
const SIDEBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__sidebar-menu__title`;
const SIDEBAR_MENU_TITLE_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar-menu__title--clickable`;
const SIDEBAR_MENU_ENTRY_CLASS = `${UI_PREFIX}__sidebar-menu__entry`;
const SIDEBAR_MENU_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--active`;
const SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--clickable`;
const SIDEBAR_MENU_SEPARATOR_CLASS = `${UI_PREFIX}__sidebar-menu__separator`;

export function SidebarMenu({ children, className = '', padded = true, ...rest }) {
    const paddedClass = padded ? SIDEBAR_MENU_PADDED_CLASS : '';
    const sidebarMenuClass = `${SIDEBAR_MENU_CLASS} ${paddedClass} ${className}`.trim();

    return (
        <div className={sidebarMenuClass} {...rest}>
            {children}
        </div>
    );
}

SidebarMenu.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    /** Applies a padding to the content */
    padded: PropTypes.bool,
};

SidebarMenu.Title = SidebarMenuTitle;
SidebarMenu.Entry = SidebarMenuEntry;
SidebarMenu.Separator = SidebarMenuSeparator;

export function SidebarMenuTitle({ children, className = '', onClick, tag, href, ...rest }) {
    const clickableClass = onClick || href || rest.to ? SIDEBAR_MENU_TITLE_CLICKABLE_CLASS : '';
    const titleClass = `${SIDEBAR_MENU_TITLE_CLASS} ${clickableClass} ${className}`;

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={titleClass} onClick={onClick} href={href} {...rest}>
            {children}
        </Tag>
    );
}

SidebarMenuTitle.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    onClick: PropTypes.func,
    /** Overrides the tag used to crate the title. If no tag is passed,
     * it will be set as a `div` or as a `a` if `href` is specified */
    tag: propTypesTag,
    href: PropTypes.string,
};

export function SidebarMenuEntry({
    isActive,
    className = '',
    onClick,
    children,
    tag,
    href,
    ...rest
}) {
    const activeClass = isActive ? SIDEBAR_MENU_ENTRY_ACTIVE_CLASS : '';
    const clickableClass = onClick || href || rest.to ? SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS : '';
    const entryClass = `${SIDEBAR_MENU_ENTRY_CLASS} ${activeClass} ${clickableClass} ${className}`;

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={entryClass} onClick={onClick} href={href} {...rest}>
            {children}
        </Tag>
    );
}

SidebarMenuEntry.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    /** Overrides the tag used to crate the title. If no tag is passed,
     * it will be set as a `div` or as a `a` if `href` is specified */
    tag: propTypesTag,
    href: PropTypes.string,
    children: propTypesChildren,
};

export function SidebarMenuSeparator() {
    return <div className={SIDEBAR_MENU_SEPARATOR_CLASS}></div>;
}
