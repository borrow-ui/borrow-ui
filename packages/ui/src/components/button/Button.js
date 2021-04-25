import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, SIZES } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { Icon } from '../icon/Icon';

const BUTTON_CLASS = `${UI_PREFIX}__button`;
// Mean and modifiers classes are calculated:
// primary => `${BUTTON_CLASS}--primary`

const MEANS_REGULAR = ['regular', 'primary', 'positive', 'negative', 'warning', 'accent'];
const MEANS_REVERSE = MEANS_REGULAR.map((m) => `${m}-reverse`);
export const MEANS = [...MEANS_REGULAR, ...MEANS_REVERSE];
export const MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES];

export function Button({
    className = '',
    disabled,
    mean = 'regular',
    size = 'normal',
    flat = false,
    separated = true,
    modifiers = [],
    icon,
    iconProps = {},
    children,
    tag: Tag = 'button',
    ...rest
}) {
    const mods = [
        ...modifiers,
        size && size,
        mean && mean,
        !flat && 'shadowed',
        disabled && 'disabled',
        separated && 'separated',
        icon && 'icon',
    ].filter((m) => m);
    const modifiersClass =
        mods.length === 0 ? '' : mods.map((m) => `${BUTTON_CLASS}--${m}`).join(' ');
    const buttonClassName = `${BUTTON_CLASS} ${modifiersClass} ${className}`.trim();

    const iconSize = icon && SIZES[Math.max(SIZES.indexOf(size) - 1, 0)];
    const { className: iconClassName = '', ...restIconProps } = iconProps;

    return (
        <Tag className={buttonClassName} disabled={disabled} {...rest}>
            {icon && (
                <Icon
                    size={iconSize}
                    name={icon}
                    {...restIconProps}
                    className={`${iconClassName} m-r-5`}
                />
            )}
            <span>{children}</span>
        </Tag>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    /** Disable the button. */
    disabled: PropTypes.bool,
    /** Defines the mean of the button. */
    mean: PropTypes.oneOf(MEANS),
    /** Controls the size of the button. */
    size: PropTypes.oneOf(SIZES),
    /** Removes the shadow to make the button looks flat. */
    flat: PropTypes.bool,
    /** Adds a margin. */
    separated: PropTypes.bool,
    /** Reserved prop, can override behaviour of the other flags. */
    modifiers: PropTypes.arrayOf(PropTypes.oneOf(MODIFIERS)),
    /** Icon to be rendered. */
    icon: PropTypes.string,
    /** Props for the icon Component. */
    iconProps: PropTypes.object,
    /** Use a different tag from `button`. */
    tag: propTypesChildren,
    children: propTypesChildren,
};
