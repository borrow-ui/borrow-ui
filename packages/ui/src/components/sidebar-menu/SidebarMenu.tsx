import React from 'react';

import { UI_PREFIX } from '../../config';

import {
    SidebarMenuEntryProps,
    SidebarMenuProps,
    SidebarMenuSeparatorProps,
    SidebarMenuTitleProps,
} from './SidebarMenu.types';

const SIDEBAR_MENU_CLASS = `${UI_PREFIX}__sidebar-menu`;
const SIDEBAR_MENU_PADDED_CLASS = `${UI_PREFIX}__sidebar-menu--padded`;
const SIDEBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__sidebar-menu__title`;
const SIDEBAR_MENU_TITLE_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar-menu__title--clickable`;
const SIDEBAR_MENU_ENTRY_CLASS = `${UI_PREFIX}__sidebar-menu__entry`;
const SIDEBAR_MENU_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--active`;
const SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar-menu__entry--clickable`;
const SIDEBAR_MENU_SEPARATOR_CLASS = `${UI_PREFIX}__sidebar-menu__separator`;

export const SidebarMenu = ({
    children,
    className = '',
    padded = true,
    ...rest
}: SidebarMenuProps): JSX.Element => {
    const paddedClass = padded ? SIDEBAR_MENU_PADDED_CLASS : '';
    const sidebarMenuClass = `${SIDEBAR_MENU_CLASS} ${paddedClass} ${className}`.trim();

    return (
        <div className={sidebarMenuClass} {...rest}>
            {children}
        </div>
    );
};

export const SidebarMenuTitle = ({
    children,
    className = '',
    onClick,
    tag,
    href,
    ...rest
}: SidebarMenuTitleProps): JSX.Element => {
    const clickableClass = onClick || href || rest.to ? SIDEBAR_MENU_TITLE_CLICKABLE_CLASS : '';
    const titleClass = `${SIDEBAR_MENU_TITLE_CLASS} ${clickableClass} ${className}`;

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={titleClass} onClick={onClick} href={href} {...rest}>
            {children}
        </Tag>
    );
};

export const SidebarMenuEntry = ({
    isActive,
    className = '',
    onClick,
    children,
    tag,
    href,
    ...rest
}: SidebarMenuEntryProps): JSX.Element => {
    const activeClass = isActive ? SIDEBAR_MENU_ENTRY_ACTIVE_CLASS : '';
    const clickableClass = onClick || href || rest.to ? SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS : '';
    const entryClass = `${SIDEBAR_MENU_ENTRY_CLASS} ${activeClass} ${clickableClass} ${className}`;

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={entryClass} onClick={onClick} href={href} {...rest}>
            {children}
        </Tag>
    );
};

export const SidebarMenuSeparator = ({
    className = '',
    ...rest
}: SidebarMenuSeparatorProps): JSX.Element => {
    const separatorClass = `${SIDEBAR_MENU_SEPARATOR_CLASS} ${className}`.trim();
    return <div className={separatorClass} {...rest}></div>;
};

SidebarMenu.Title = SidebarMenuTitle;
SidebarMenu.Entry = SidebarMenuEntry;
SidebarMenu.Separator = SidebarMenuSeparator;
