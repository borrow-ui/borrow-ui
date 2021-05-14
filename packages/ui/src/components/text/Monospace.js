import React from 'react';
import PropTypes from 'prop-types';

import { propTypesChildren } from '../../utils/types';
import { UI_PREFIX } from '../../config';

const TEXT_MONOSPACE_CLASS = `${UI_PREFIX}__text__monospace`;

export function Monospace({ children, className = '', ...rest }) {
    const monospaceClassName = `${TEXT_MONOSPACE_CLASS} ${className}`;

    return (
        <span className={monospaceClassName} {...rest}>
            {children}
        </span>
    );
}

Monospace.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
};
