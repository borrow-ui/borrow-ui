import React from 'react';

import { UI_PREFIX, SIZES } from '../../config';
import { cx } from '../../utils/classNames';
import { Icon } from '../icon/Icon';
import { ButtonProps } from './Button.types';

const BUTTON_CLASS = `${UI_PREFIX}__button`;
// Mean and modifiers classes are calculated:
// primary => `${BUTTON_CLASS}--primary`

const MEANS_REGULAR = [
    'primary',
    'secondary',
    'positive',
    'negative',
    'warning',
    'accent',
    'neutral',
    'neutral-dark',
    'neutral-light',
];
const MEANS_REVERSE = MEANS_REGULAR.map((m) => `${m}-reverse`);
export const MEANS = [...MEANS_REGULAR, ...MEANS_REVERSE];
export const MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES];

export function Button({
    className = '',
    disabled,
    mean = 'neutral',
    size = 'normal',
    flat = false,
    separated = true,
    modifiers = [],
    icon,
    iconProps = {},
    children,
    tag: Tag = 'button',
    ...rest
}: ButtonProps): JSX.Element {
    const mods = [
        ...modifiers,
        size && size,
        mean && mean,
        !flat && 'shadowed',
        disabled && 'disabled',
        separated && 'separated',
        icon && 'icon',
    ].filter((m) => m);
    const modifiersClass = mods.map((m) => `${BUTTON_CLASS}--${m}`).join(' ');
    const buttonClassName = cx(BUTTON_CLASS, modifiersClass, className);

    const iconSize = (icon && SIZES[Math.max(SIZES.indexOf(size) - 1, 0)]) || undefined;
    const { className: iconClassName = '', ...restIconProps } = iconProps;

    return (
        <Tag className={buttonClassName} disabled={disabled} {...rest}>
            <>
                {icon && (
                    <Icon
                        size={iconSize}
                        name={icon}
                        {...restIconProps}
                        className={`${iconClassName} m-r-5`}
                    />
                )}
                <span>{children}</span>
            </>
        </Tag>
    );
}
