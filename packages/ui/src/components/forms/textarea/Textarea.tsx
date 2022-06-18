import React from 'react';

import { UI_PREFIX } from '../../../config';
import { cx } from '../../../utils/classNames';
import { TextareaProps } from './Textarea.types';

const FORM_TEXTAREA_CLASS = `${UI_PREFIX}__form__field__textarea`;
const FORM_TEXTAREA_DISABLED_CLASS = `${UI_PREFIX}__form__field__textarea--disabled`;
const FORM_TEXTAREA_INVALID_CLASS = `${UI_PREFIX}__form__field__textarea--invalid`;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', disabled, invalid, ...rest }, ref) => {
        const textareaClassName = cx(FORM_TEXTAREA_CLASS, className, {
            [FORM_TEXTAREA_DISABLED_CLASS]: disabled,
            [FORM_TEXTAREA_INVALID_CLASS]: invalid,
        });

        return <textarea className={textareaClassName} disabled={disabled} {...rest} ref={ref} />;
    }
);

Textarea.displayName = 'Textarea';
