import React from 'react';

import { UI_PREFIX } from '../../../config';
import { cx } from '../../../utils/classNames';
import { InputProps } from './Input.types';

export const FORM_INPUT_CLASS = `${UI_PREFIX}__form__field__input`;
export const FORM_INPUT_DISABLED_CLASS = `${UI_PREFIX}__form__field__input--disabled`;
export const FORM_INPUT_INVALID_CLASS = `${UI_PREFIX}__form__field__input--invalid`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, disabled, invalid, ...rest }, ref): JSX.Element => {
        const inputClassName = cx(FORM_INPUT_CLASS, className, {
            [FORM_INPUT_DISABLED_CLASS]: disabled,
            [FORM_INPUT_INVALID_CLASS]: invalid,
        });

        return <input className={inputClassName} disabled={disabled} {...rest} ref={ref} />;
    }
);

Input.displayName = 'Input';
