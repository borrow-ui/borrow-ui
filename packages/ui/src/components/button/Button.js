import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

// import 'style/components/button/button.scss';

const BUTTON_CLASS = `${UI_PREFIX}__button`;
// Mean and modifiers classes are calculated: i.e. `${BUTTON_CLASS}--positive`
const BUTTON_DISABLED_CLASS = `${BUTTON_CLASS}--disabled`;

export function Button({ className, disabled, mean, modifiers = [], children, ...rest }) {
    const disabledClass = disabled ? BUTTON_DISABLED_CLASS : '';
    const meanClass = mean ? `${BUTTON_CLASS}--${mean}` : '';

    const modifiersClass =
        modifiers.length === 0 ? '' : modifiers.map(m => `${BUTTON_CLASS}--${m}`).join(' ');
    const buttonClassName = `${BUTTON_CLASS} ${disabledClass} ${meanClass} ${modifiersClass} ${className}`;

    return (
        <button className={buttonClassName} {...rest}>
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    mean: PropTypes.oneOf(['primary', 'positive', 'negative', 'warning']),
    modifiers: PropTypes.arrayOf(PropTypes.oneOf(['shadowed'])),
    children: propTypesChildren,
};
