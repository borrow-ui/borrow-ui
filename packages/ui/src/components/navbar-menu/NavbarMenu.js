import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { NavbarMenuItem } from './NavbarMenuItem';
import { NavbarMenuTitle } from './NavbarMenuTitle';

const NAVBAR_MENU_CLASS = `${UI_PREFIX}__navbar-menu`;

export function NavbarMenu({ title, entries, className = '', titleProps = {}, ...rest }) {
    const navbarMenuClassName = `${NAVBAR_MENU_CLASS} ${className}`.trim();

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
    /** A list of entries whose props are valid `NavbarMenuItem` props. */
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            label: propTypesChildren.isRequired,
            description: propTypesChildren,
            tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            labelProps: PropTypes.object,
            descriptionProps: PropTypes.object,
        })
    ),
    className: PropTypes.string,
    /** Properties passed to `NavbarMenuTitle` component. */
    titleProps: PropTypes.object,
};
