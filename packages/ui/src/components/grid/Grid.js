import React from 'react';
import PropTypes from 'prop-types';
import 'flexboxgrid2/flexboxgrid2.css';

export function Row({ children, className = '', ...rest }) {
    const rowClassName = `row ${className}`;

    return (
        <div className={rowClassName} {...rest}>
            {children}
        </div>
    );
}

Row.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
};

export function Col({
    children,
    size = 6,
    colSize = '',
    className = '',
    colClassName: overrideColClassName,
    ...rest
}) {
    const colSizeClassName = colSize ? colSize : `col-xs-12 col-sm-${size}`;
    const colClassName = overrideColClassName
        ? `${overrideColClassName} ${className}`
        : `${colSizeClassName} ${className}`;

    return (
        <div className={colClassName} {...rest}>
            {children}
        </div>
    );
}

Col.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    size: PropTypes.number,
    colSize: PropTypes.string,
    className: PropTypes.string,
    colClassName: PropTypes.string,
};
