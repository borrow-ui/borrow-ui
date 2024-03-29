import React from 'react';

import { UI_PREFIX } from '../../config';
import { NavbarMenuProps } from './NavbarMenu.types';

import { NavbarMenuItem } from './NavbarMenuItem';
import { NavbarMenuTitle } from './NavbarMenuTitle';

const NAVBAR_MENU_CLASS = `${UI_PREFIX}__navbar-menu`;

export const NavbarMenu = ({
    title,
    entries,
    className = '',
    titleProps = {},
    ...rest
}: NavbarMenuProps): JSX.Element => {
    const navbarMenuClassName = `${NAVBAR_MENU_CLASS} ${className}`.trim();

    return (
        <div className={navbarMenuClassName} {...rest}>
            {title && <NavbarMenuTitle {...titleProps}>{title}</NavbarMenuTitle>}
            {entries.map((entryProps, index) => {
                return <NavbarMenuItem {...entryProps} key={`navbar-menu-entry-${index}`} />;
            })}
        </div>
    );
};
