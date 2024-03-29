import React from 'react';

import { UI_PREFIX } from '../../../config';
import { Label } from '../label/Label';
import { LAYOUTS, VALIGNMENTS } from '../constants';
import { FieldProps, HFieldProps, VFieldProps } from './Field.types';

const FIELD_CLASS = `${UI_PREFIX}__form__field`;
const FIELD_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.HORIZONTAL}`;
const FIELD_VERTICAL_CLASS = `${UI_PREFIX}__form__field--${LAYOUTS.VERTICAL}`;
// vAlgnment class is autogenerated:
// const vAlignmentClass = `${UI_PREFIX}__form__field--valignment-${vAlignment}`;
const FIELD_CONTROLLER_CLASS = `${UI_PREFIX}__form__field__controller`;
const FIELD_CONTROLLER_HORIZONTAL_CLASS = `${UI_PREFIX}__form__field__controller--${LAYOUTS.HORIZONTAL}`;
const FIELD_CONTROLLER_VERTICAL_CLASS = `${UI_PREFIX}__form__field__controller--${LAYOUTS.VERTICAL}`;
const FIELD_DESCRIPTION_CONTAINER_CLASS = `${UI_PREFIX}__form__field__description__container`;
const FIELD_DESCRIPTION_CLASS = `${UI_PREFIX}__form__field__description`;

export const Field = ({
    label,
    children,
    className = '',
    description = '',
    required = false,
    layout = LAYOUTS.DEFAULT,
    htmlFor,
    vAlignment = VALIGNMENTS.DEFAULT,
    labelProps = {},
    labelWidth,
    labelAlignment,
    controllerProps = {},
    descriptionProps = {},
    compact = false,
    ...rest
}: FieldProps): JSX.Element => {
    const layoutClass = layout === LAYOUTS.VERTICAL ? FIELD_VERTICAL_CLASS : FIELD_HORIZONTAL_CLASS;
    const vAlignmentClass = `${FIELD_CLASS}--valignment-${vAlignment}`;
    const fieldClass = `${FIELD_CLASS} ${layoutClass} ${vAlignmentClass} ${className}`.trim();

    const fieldControllerLayoutClass =
        layout === LAYOUTS.VERTICAL
            ? FIELD_CONTROLLER_VERTICAL_CLASS
            : FIELD_CONTROLLER_HORIZONTAL_CLASS;
    const { className: controllerClassName = '', ...cProps } = controllerProps;
    const fieldControllerClass =
        `${FIELD_CONTROLLER_CLASS} ${fieldControllerLayoutClass} ${controllerClassName}`.trim();

    const { className: descriptionClassName = '', ...dProps } = descriptionProps;
    const fieldDescriptionClass = `${FIELD_DESCRIPTION_CLASS} ${descriptionClassName}`.trim();

    const descriptionContent = description && (
        <div className={FIELD_DESCRIPTION_CONTAINER_CLASS}>
            <div className={fieldDescriptionClass} {...dProps}>
                {description}
            </div>
        </div>
    );

    return (
        <div className={fieldClass} {...rest}>
            {label && (
                <Label
                    label={label}
                    width={labelWidth}
                    alignment={labelAlignment}
                    vAlignment={vAlignment}
                    layout={layout}
                    required={required}
                    htmlFor={htmlFor}
                    {...labelProps}
                />
            )}
            {((children && compact) || !compact) && (
                <div className={fieldControllerClass} {...cProps}>
                    {children}
                    {description && layout === LAYOUTS.HORIZONTAL && descriptionContent}
                </div>
            )}
            {description && layout === LAYOUTS.VERTICAL && descriptionContent}
        </div>
    );
};

export const VField = ({ children, ...rest }: VFieldProps): JSX.Element => {
    return (
        <Field layout={LAYOUTS.VERTICAL} {...rest}>
            {children}
        </Field>
    );
};

export const HField = ({ children, ...rest }: HFieldProps): JSX.Element => {
    return (
        <Field layout={LAYOUTS.HORIZONTAL} {...rest}>
            {children}
        </Field>
    );
};
