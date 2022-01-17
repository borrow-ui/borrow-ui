import React from 'react';

import { UI_PREFIX } from '../../../config';
import { InputProps } from './Input.types';

export const FORM_INPUT_CLASS = `${UI_PREFIX}__form__field__input`;
export const FORM_INPUT_DISABLED_CLASS = `${UI_PREFIX}__form__field__input--disabled`;
export const FORM_INPUT_INVALID_CLASS = `${UI_PREFIX}__form__field__input--invalid`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, disabled, invalid, ...rest }, ref): JSX.Element => {
        const disabledClass = disabled ? FORM_INPUT_DISABLED_CLASS : '';
        const invalidClass = invalid ? FORM_INPUT_INVALID_CLASS : '';
        const inputClassName = `${FORM_INPUT_CLASS} ${disabledClass} ${invalidClass} ${className}`;

        return <input className={inputClassName} disabled={disabled} {...rest} ref={ref} />;
    }
);

Input.displayName = 'Input';
