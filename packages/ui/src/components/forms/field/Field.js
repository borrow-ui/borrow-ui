import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';
import { propTypesChildren } from '../../../utils/types';
import { Label } from '../label/Label';
import { LAYOUTS, ALIGNMENTS } from '../constants';

const FIELD_CLASS = `${UI_PREFIX}__form__field`;
const FIELD_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.HORIZONTAL}`;
const FIELD_VERTICAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.VERTICAL}`;
const FIELD_CONTROLLER_CLASS = `${UI_PREFIX}__form__field__controller`;
const FIELD_CONTROLLER_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field__controller--${LAYOUTS.HORIZONTAL}`;
const FIELD_CONTROLLER_VERTICAL_CLASS = `${UI_PREFIX}__form__field__controller--${LAYOUTS.VERTICAL}`;

export function Field({
    label,
    children,
    className = '',
    required = false,
    layout = LAYOUTS.DEFAULT,
    labelProps = {},
    labelWidth,
    labelAlignment,
    controllerProps = {},
    ...rest
}) {
    const layoutClass = layout === LAYOUTS.VERTICAL ? FIELD_VERTICAL_CLASS : FIELD_HORIZONTAL_CLASS;
    const fieldClass = `${FIELD_CLASS} ${layoutClass} ${className}`.trim();

    const fieldControllerLayoutClass =
        layout === LAYOUTS.VERTICAL
            ? FIELD_CONTROLLER_VERTICAL_CLASS
            : FIELD_CONTROLLER_HORIZONTAL_CLASS;
    const { className: controllerClassName = '', ...cProps } = controllerProps;
    const fieldControllerClass = `${FIELD_CONTROLLER_CLASS} ${fieldControllerLayoutClass} ${controllerClassName}`;

    return (
        <div className={fieldClass} {...rest}>
            {label && (
                <Label
                    label={label}
                    width={labelWidth}
                    alignment={labelAlignment}
                    layout={layout}
                    required={required}
                    {...labelProps}
                />
            )}
            <div className={fieldControllerClass} {...cProps}>
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
    /** Layout can be `vertical` or `horizontal`. You can change the constants,
     * as well as `DEFAULT`, to create other types of layout.
     */
    layout: PropTypes.oneOf([LAYOUTS.VERTICAL, LAYOUTS.HORIZONTAL]),
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelAlignment: PropTypes.oneOf([ALIGNMENTS.LEFT, ALIGNMENTS.CENTER, ALIGNMENTS.RIGHT]),
    /** Additional props passed to label container */
    labelProps: PropTypes.object,
    /** Additional props passed to controller container */
    controllerProps: PropTypes.object,
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
