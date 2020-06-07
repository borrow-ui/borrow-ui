import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';

export const FORM_INPUT_CLASS = `${UI_PREFIX}__form__field__input`;
export const FORM_INPUT_DISABLED_CLASS = `${UI_PREFIX}__form__field__input--disabled`;
export const FORM_INPUT_INVALID_CLASS = `${UI_PREFIX}__form__field__input--invalid`;

export function Input({ className, disabled, invalid, ...rest }) {
    const disabledClass = disabled ? FORM_INPUT_DISABLED_CLASS : '';
    const invalidClass = invalid ? FORM_INPUT_INVALID_CLASS : '';
    const inputClassName = `${FORM_INPUT_CLASS} ${disabledClass} ${invalidClass} ${className}`;

    return <input className={inputClassName} disabled={disabled} {...rest} />;
}

Input.propTypes = {
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    className: PropTypes.string,
};
