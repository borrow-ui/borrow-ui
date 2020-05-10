import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const LINK_CLASS = `${UI_PREFIX}__link`;
const LINK_UNDERLINE_CLASS = `${UI_PREFIX}__link--underline`;
const LINK_NO_UNDERLINE_CLASS = `${UI_PREFIX}__link--no-underline`;

export function Link({ tag: Tag = 'a', className = '', underline = true, children, ...rest }) {
    const underlineClass = underline ? LINK_UNDERLINE_CLASS : LINK_NO_UNDERLINE_CLASS;
    const linkClassName = `${LINK_CLASS} ${underlineClass} ${className}`;

    return (
        <Tag className={linkClassName} {...rest}>
            {children}
        </Tag>
    );
}

Link.propTypes = {
    tag: propTypesChildren,
    className: PropTypes.string,
    underline: PropTypes.bool,
    children: propTypesChildren,
};
