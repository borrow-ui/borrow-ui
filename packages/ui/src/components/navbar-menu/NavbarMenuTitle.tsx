import React from 'react';

import { UI_PREFIX } from '../../config';
import { NavbarMenuTitleProps } from './NavbarMenu.types';

const NAVBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__navbar-menu__title`;

export const NavbarMenuTitle = ({
    className = '',
    children,
    ...rest
}: NavbarMenuTitleProps): JSX.Element => {
    const navbarMenuTitleClass = `${NAVBAR_MENU_TITLE_CLASS} ${className}`.trim();

    return (
        <h3 className={navbarMenuTitleClass} {...rest}>
            {children}
        </h3>
    );
};
