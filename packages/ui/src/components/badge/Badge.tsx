import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
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
    const badgeClassName = cx(BADGE_CLASS, className, {
        [`${BADGE_CLASS}--${type}`]: type && type !== 'squared',
        [BADGE_CLICKABLE_CLASS]: !!onClick,
        [`color-${color}-bg color-on-${color}`]: !!color,
    });

    return (
        <Tag className={badgeClassName} onClick={onClick} {...rest}>
            {children}
        </Tag>
    );
};
