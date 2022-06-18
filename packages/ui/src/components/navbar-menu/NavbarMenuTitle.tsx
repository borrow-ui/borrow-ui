import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { NavbarMenuTitleProps } from './NavbarMenu.types';

const NAVBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__navbar-menu__title`;

export const NavbarMenuTitle = ({
    className = '',
    children,
    ...rest
}: NavbarMenuTitleProps): JSX.Element => {
    const navbarMenuTitleClassName = cx(NAVBAR_MENU_TITLE_CLASS, className);

    return (
        <h3 className={navbarMenuTitleClassName} {...rest}>
            {children}
        </h3>
    );
};
