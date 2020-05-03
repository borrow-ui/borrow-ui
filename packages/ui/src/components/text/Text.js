import React from 'react';
import PropTypes from 'prop-types';
import { UI_PREFIX } from '../../config';

const TEXT_CLASS = `${UI_PREFIX}__text`;
const TEXT_BIG_CLASS = `${UI_PREFIX}__text--big`;
const TEXT_SMALL_CLASS = `${UI_PREFIX}__text--small`;

export function Text({ className, size = 'default', textTag, children, ...rest }) {
    const Tag = textTag || 'div';

    const sizeClassName = size
        ? size === 'big'
            ? TEXT_BIG_CLASS
            : size === 'small'
            ? TEXT_SMALL_CLASS
            : ''
        : '';
    const textClassName = `${TEXT_CLASS} ${sizeClassName} ${className || ''}`;

    return (
        <Tag className={textClassName} {...rest}>
            {children}
        </Tag>
    );
}

Text.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['big', 'small', 'default']),
    textTag: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
