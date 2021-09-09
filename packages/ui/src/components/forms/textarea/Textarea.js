import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';

const FORM_TEXTAREA_CLASS = `${UI_PREFIX}__form__field__textarea`;
const FORM_TEXTAREA_DISABLED_CLASS = `${UI_PREFIX}__form__field__textarea--disabled`;
const FORM_TEXTAREA_INVALID_CLASS = `${UI_PREFIX}__form__field__textarea--invalid`;

export const Textarea = React.forwardRef(({ className = '', disabled, invalid, ...rest }, ref) => {
    const disabledClass = disabled ? FORM_TEXTAREA_DISABLED_CLASS : '';
    const invalidClass = invalid ? FORM_TEXTAREA_INVALID_CLASS : '';

    const textareaClassName =
        `${FORM_TEXTAREA_CLASS} ${disabledClass} ${invalidClass} ${className}`.trim();

    return <textarea className={textareaClassName} disabled={disabled} {...rest} ref={ref} />;
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    className: PropTypes.string,
};
