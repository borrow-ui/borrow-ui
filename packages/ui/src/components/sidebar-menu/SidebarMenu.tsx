import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
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
    const sidebarMenuClassName = cx(SIDEBAR_MENU_CLASS, className, {
        [SIDEBAR_MENU_PADDED_CLASS]: padded,
    });

    return (
        <div className={sidebarMenuClassName} {...rest}>
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
    const titleClassName = cx(SIDEBAR_MENU_TITLE_CLASS, className, {
        [SIDEBAR_MENU_TITLE_CLICKABLE_CLASS]: onClick || href || rest.to,
    });

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={titleClassName} onClick={onClick} href={href} {...rest}>
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
    const entryClassName = cx(SIDEBAR_MENU_ENTRY_CLASS, className, {
        [SIDEBAR_MENU_ENTRY_ACTIVE_CLASS]: isActive,
        [SIDEBAR_MENU_ENTRY_CLICKABLE_CLASS]: onClick || href || rest.to,
    });

    const Tag = tag ? tag : href ? 'a' : 'div';

    return (
        <Tag className={entryClassName} onClick={onClick} href={href} {...rest}>
            {children}
        </Tag>
    );
};

export const SidebarMenuSeparator = ({
    className = '',
    ...rest
}: SidebarMenuSeparatorProps): JSX.Element => {
    const separatorClass = cx(SIDEBAR_MENU_SEPARATOR_CLASS, className);
    return <div className={separatorClass} {...rest}></div>;
};

SidebarMenu.Title = SidebarMenuTitle;
SidebarMenu.Entry = SidebarMenuEntry;
SidebarMenu.Separator = SidebarMenuSeparator;
