import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

const LINK_CLASS = `${UI_PREFIX}__link`;

export function Link({ tag: Tag = 'a', className = '', children, ...rest }) {
    const linkClassName = `${LINK_CLASS} ${className}`;

    return (
        <Tag className={linkClassName} {...rest}>
            {children}
        </Tag>
    );
}

Link.propTypes = {
    tag: propTypesChildren,
    className: PropTypes.string,
    children: propTypesChildren,
};
