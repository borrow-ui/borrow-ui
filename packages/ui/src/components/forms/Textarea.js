import React from 'react';
import PropTypes from 'prop-types';
import { UI_PREFIX } from 'config';

const FORM_TEXTAREA_CLASS = `${UI_PREFIX}__form__field__textarea`;

export function Textarea({ className, ...rest }) {
    const textareaClassName = `${FORM_TEXTAREA_CLASS} ${className}`;

    return <textarea className={textareaClassName} {...rest} />;
}

Textarea.propTypes = {
    className: PropTypes.string,
};
