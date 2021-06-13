import React from 'react';
import PropTypes from 'prop-types';
import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const TEXT_CLASS = `${UI_PREFIX}__text`;
const TEXT_BIG_CLASS = `${UI_PREFIX}__text--big`;
const TEXT_SMALL_CLASS = `${UI_PREFIX}__text--small`;

export function Text({ size = 'normal', tag: Tag = 'div', className = '', children, ...rest }) {
    const sizeClassName =
        size === 'big' ? TEXT_BIG_CLASS : size === 'small' ? TEXT_SMALL_CLASS : '';
    const textClassName = `${TEXT_CLASS} ${sizeClassName} ${className}`.trim();

    return (
        <Tag className={textClassName} {...rest}>
            {children}
        </Tag>
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['big', 'small', 'normal']),
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    children: propTypesChildren,
};
