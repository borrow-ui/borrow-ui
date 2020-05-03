import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, SIZES } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { Icon } from '../icon/Icon';

// import 'style/components/button/button.scss';

const BUTTON_CLASS = `${UI_PREFIX}__button`;
// Mean and modifiers classes are calculated:
// primary => `${BUTTON_CLASS}--primary`

const BUTTON_DISABLED_CLASS = `${BUTTON_CLASS}--disabled`;

const MEANS_REGULAR = ['regular', 'primary', 'positive', 'negative', 'warning', 'accent'];
export const MEANS = [...MEANS_REGULAR, ...MEANS_REGULAR.map(m => `${m}-reverse`)];
export const MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES];

export function Button({
    className,
    disabled,
    mean,
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
    const disabledClass = disabled ? BUTTON_DISABLED_CLASS : '';
    const meanClass = mean ? `${BUTTON_CLASS}--${mean}` : '';

    const mods = [
        ...modifiers,
        size && size,
        !flat && 'shadowed',
        separated && 'separated',
        icon && 'icon',
    ].filter(m => m);
    const modifiersClass =
        mods.length === 0 ? '' : mods.map(m => `${BUTTON_CLASS}--${m}`).join(' ');
    const buttonClassName = `${BUTTON_CLASS} ${disabledClass} ${meanClass} ${modifiersClass} ${className}`;

    const iconSize = icon && SIZES[SIZES.indexOf(size) - 1];
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
            {children}
        </Tag>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    mean: PropTypes.oneOf(MEANS),
    size: PropTypes.oneOf(SIZES),
    flat: PropTypes.bool,
    separated: PropTypes.bool,
    modifiers: PropTypes.arrayOf(PropTypes.oneOf(MODIFIERS)),
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    tag: propTypesChildren,
    children: propTypesChildren,
};
