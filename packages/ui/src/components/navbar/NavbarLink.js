import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

const NAVBAR_LINK_CLASS = `${UI_PREFIX}__navbar__link`;

export function NavbarLink({ tag: Tag = 'a', children, className = '', ...props }) {
    const navbarLinkClassName = `${NAVBAR_LINK_CLASS} ${className}`;

    return (
        <Tag className={navbarLinkClassName} {...props}>
            {children}
        </Tag>
    );
}

NavbarLink.propTypes = {
    tag: propTypesChildren,
    children: propTypesChildren,
    className: PropTypes.string,
};
