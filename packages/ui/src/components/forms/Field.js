import React from 'react';
import PropTypes from 'prop-types';

import { Label } from './Label';
import { propTypesChildren } from '../../utils/types';
import { UI_PREFIX } from '../../config';
import { LAYOUTS } from './constants';

const FIELD_CLASS = `${UI_PREFIX}__form__field`;
const FIELD_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.HORIZONTAL}`;
const FIELD_VERTICAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.VERTICAL}`;
const FIELD_INPUT_CLASS = `${UI_PREFIX}__form__field-input`;
const FIELD_INPUT_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field-input--${LAYOUTS.HORIZONTAL}`;
const FIELD_INPUT_VERTICAL_CLASS = `${UI_PREFIX}__form__field-input--${LAYOUTS.VERTICAL}`;

export function Field({
    label,
    children,
    className = '',
    required = false,
    layout = LAYOUTS.DEFAULT,
    labelProps = {},
    labelWidth,
    inputProps = {},
    ...rest
}) {
    const layoutClass = layout === LAYOUTS.VERTICAL ? FIELD_VERTICAL_CLASS : FIELD_HORIZONTAL_CLASS;
    const fieldClass = `${FIELD_CLASS} ${layoutClass} ${className}`;

    const fieldInputLayoutClass =
        layout === LAYOUTS.VERTICAL ? FIELD_INPUT_VERTICAL_CLASS : FIELD_INPUT_HORIZONTAL_CLASS;
    const { className: inputClassName = '', ...iProps } = inputProps;
    const fieldInputClass = `${FIELD_INPUT_CLASS} ${fieldInputLayoutClass} ${inputClassName}`;

    return (
        <div className={fieldClass} {...rest}>
            {label && (
                <Label
                    label={label}
                    width={labelWidth}
                    layout={layout}
                    required={required}
                    {...labelProps}
                />
            )}
            <div className={fieldInputClass} {...iProps}>
                {children}
            </div>
        </div>
    );
}

Field.propTypes = {
    label: propTypesChildren,
    children: propTypesChildren,
    className: PropTypes.string,
    required: PropTypes.bool,
    layout: PropTypes.oneOf([LAYOUTS.VERTICAL, LAYOUTS.HORIZONTAL]),
    labelProps: PropTypes.object,
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputProps: PropTypes.object,
};

export function VField({ children, ...rest }) {
    return (
        <Field layout={LAYOUTS.VERTICAL} {...rest}>
            {children}
        </Field>
    );
}

VField.propTypes = {
    children: propTypesChildren,
};

export function HField({ children, ...rest }) {
    return (
        <Field layout={LAYOUTS.HORIZONTAL} {...rest}>
            {children}
        </Field>
    );
}

HField.propTypes = {
    children: propTypesChildren,
};
