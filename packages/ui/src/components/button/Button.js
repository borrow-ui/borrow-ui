import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, SIZES } from 'config';
import { propTypesChildren } from 'utils/types';

import { Icon } from '../icon/Icon';

// import 'style/components/button/button.scss';

const BUTTON_CLASS = `${UI_PREFIX}__button`;
// Mean and modifiers classes are calculated: i.e. `${BUTTON_CLASS}--positive`
const BUTTON_DISABLED_CLASS = `${BUTTON_CLASS}--disabled`;

export function Button({
    className,
    disabled,
    mean,
    size = 'normal',
    flat,
    modifiers = [],
    icon,
    iconProps = {},
    children,
    tag: Tag = 'button',
    ...rest
}) {
    const disabledClass = disabled ? BUTTON_DISABLED_CLASS : '';
    const meanClass = mean ? `${BUTTON_CLASS}--${mean}` : '';

    const mods = [...modifiers, size && size, !flat && 'shadowed', icon && 'icon'].filter(m => m);
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
    mean: PropTypes.oneOf(['primary', 'positive', 'negative', 'warning', 'accent']),
    size: PropTypes.oneOf(SIZES),
    flat: PropTypes.bool,
    modifiers: PropTypes.array,
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    tag: propTypesChildren,
    children: propTypesChildren,
};
