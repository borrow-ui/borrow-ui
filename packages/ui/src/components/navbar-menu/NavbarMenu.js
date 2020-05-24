import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { NavbarMenuItem } from './NavbarMenuItem';
import { NavbarMenuTitle } from './NavbarMenuTitle';

const NAVBAR_MENU_CLASS = `${UI_PREFIX}__navbar-menu`;

export function NavbarMenu({ title, entries, className = '', titleProps = {}, ...rest }) {
    const navbarMenuClassName = `${NAVBAR_MENU_CLASS} ${className}`;

    return (
        <div className={navbarMenuClassName} {...rest}>
            {title && <NavbarMenuTitle {...titleProps}>{title}</NavbarMenuTitle>}
            {entries.map((entryProps, index) => {
                return <NavbarMenuItem {...entryProps} key={`navbar-menu-entry-${index}`} />;
            })}
        </div>
    );
}

NavbarMenu.propTypes = {
    title: propTypesChildren,
    entries: PropTypes.arrayOf(NavbarMenuItem),
    className: PropTypes.string,
    titleProps: PropTypes.object,
};
