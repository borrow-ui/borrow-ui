import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { NavbarLinkProps } from './NavbarLink.types';

const NAVBAR_LINK_CLASS = `${UI_PREFIX}__navbar__link`;

export const NavbarLink = ({
    tag: Tag = 'a',
    children,
    className = '',
    ...rest
}: NavbarLinkProps): JSX.Element => {
    const navbarLinkClassName = cx(NAVBAR_LINK_CLASS, className);

    return (
        <Tag className={navbarLinkClassName} {...rest}>
            {children}
        </Tag>
    );
};
