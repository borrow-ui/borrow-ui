import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { BadgeProps } from './Badge.types';

const BADGE_CLASS = `${UI_PREFIX}__badge`;
const BADGE_CLICKABLE_CLASS = `${UI_PREFIX}__badge--clickable`;
// type class is calculated, i.e. `${UI_PREFIX}__badge--rounded`
// color classes are added for bg and color, i.e. `color-on-primary color-primary-bg`

export const Badge = ({
    className = '',
    color = 'neutral',
    type = 'rounded',
    tag: Tag = 'span',
    onClick,
    children,
    ...rest
}: BadgeProps): JSX.Element => {
    const colorClass = color ? `color-${color}-bg color-on-${color}` : '';
    const typeClass = type && type !== 'squared' ? `${BADGE_CLASS}--${type}` : '';
    const clickableClass = onClick ? BADGE_CLICKABLE_CLASS : '';
    const propsClasses = [colorClass, typeClass, clickableClass].join(' ').trim();
    const badgeClass = [BADGE_CLASS, propsClasses, className].join(' ').trim();

    return (
        <Tag className={badgeClass} onClick={onClick} {...rest}>
            {children}
        </Tag>
    );
};
