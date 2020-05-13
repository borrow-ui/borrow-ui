import React from 'react';
import PropTypes from 'prop-types';

import 'flexboxgrid2/flexboxgrid2.css';

import { propTypesChildren } from '../../utils/types';

export function Row({ children, className = '', ...rest }) {
    const rowClassName = `row ${className}`;

    return (
        <div className={rowClassName} {...rest}>
            {children}
        </div>
    );
}

Row.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
};

export function Col({
    children,
    size = 6,
    className = '',
    colClassName: overrideColClassName,
    ...rest
}) {
    const colSizeClassName = `col-xs-12 col-sm-${size}`;
    const colClassName = `${className} ${overrideColClassName || colSizeClassName}`;

    return (
        <div className={colClassName} {...rest}>
            {children}
        </div>
    );
}

Col.propTypes = {
    children: propTypesChildren,
    /** Set the size for the sm column. This is a shortcut to configure `col-xs-12 col-sm-*`. */
    size: PropTypes.number,
    /** Overrides the default `col-xs-12 col-sm-<size>` value. */
    colClassName: PropTypes.string,
    className: PropTypes.string,
};
