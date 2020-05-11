import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const NAVBAR_MENU_TITLE_CLASS = `${UI_PREFIX}__navbar-menu__title`;

export function NavbarMenuTitle({ className = '', children, ...rest }) {
    const navbarMenuTitleClass = `${NAVBAR_MENU_TITLE_CLASS} ${className}`;

    return (
        <h3 className={navbarMenuTitleClass} {...rest}>
            {children}
        </h3>
    );
}

NavbarMenuTitle.propTypes = {
    className: PropTypes.string,
    children: propTypesChildren,
};
