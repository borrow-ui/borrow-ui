import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

const BADGE_CLASS = `${UI_PREFIX}__badge`;
const BADGE_CLICKABLE_CLASS = `${UI_PREFIX}__badge--clickable`;
// type class is calculated, i.e. `${UI_PREFIX}__badge--rounded`

export function Badge({
    className,
    color = 'neutral',
    type = 'rounded',
    tag: Tag = 'span',
    children,
    ...rest
}) {
    const colorClass = color ? `color-${color}-bg color-on-${color}` : '';
    const typeClass = type && type !== 'squared' ? `${BADGE_CLASS}--${type}` : '';
    const clickableClass = rest.onClick ? BADGE_CLICKABLE_CLASS : '';
    const badgeClass = `${BADGE_CLASS} ${colorClass} ${typeClass} ${clickableClass} ${className}`;

    return (
        <Tag className={badgeClass} {...rest}>
            {children}
        </Tag>
    );
}

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    type: PropTypes.oneOf(['rounded', 'circular', 'squared']),
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: propTypesChildren,
};
