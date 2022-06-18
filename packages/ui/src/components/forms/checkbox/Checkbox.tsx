import React from 'react';

import { UI_PREFIX } from '../../../config';
import { cx } from '../../../utils/classNames';
import { KEY_CODES } from '../../../utils/constants';
import { CheckboxProps } from './Checkbox.types';

const FORM_CHECKBOX_CONTAINER_CLASS = `${UI_PREFIX}__form__field__checkbox__container`;
const FORM_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__checkbox`;
const FORM_CHECKBOX_CHECKED_CLASS = `${UI_PREFIX}__form__field__checkbox--checked`;
const FORM_CHECKBOX_DISABLED_CLASS = `${UI_PREFIX}__form__field__checkbox--disabled`;
const FORM_CHECKBOX_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__checkbox__checkbox`;
const FORM_CHECKBOX_INDICATOR_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator`;
const FORM_CHECKBOX_INDICATOR_CHECKED_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator--checked`;
const FORM_CHECKBOX_INDICATOR_DISABLED_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator--disabled`;
const FORM_CHECKBOX_LABEL_CLASS = `${UI_PREFIX}__form__field__checkbox__label`;
const FORM_CHECKBOX_LABEL_DISABLED_CLASS = `${UI_PREFIX}__form__field__checkbox__label--disabled`;

export const NO_ONCLICK_ONCHANGE_ERROR_MESSAGE =
    'At least one of onChange or onClick property is required.';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        { checked, onClick, onChange, label, disabled, labelProps = {}, className = '', ...rest },
        ref
    ): JSX.Element => {
        const checkboxContainerClassName = cx(FORM_CHECKBOX_CONTAINER_CLASS, className);
        const checkboxClassName = cx(FORM_CHECKBOX_CLASS, {
            [FORM_CHECKBOX_CHECKED_CLASS]: checked,
            [FORM_CHECKBOX_DISABLED_CLASS]: disabled,
        });
        const indicatorClassName = cx(FORM_CHECKBOX_INDICATOR_CLASS, {
            [FORM_CHECKBOX_INDICATOR_CHECKED_CLASS]: checked,
            [FORM_CHECKBOX_INDICATOR_DISABLED_CLASS]: disabled,
        });
        const { className: labelPropsClassName = '', ...restLabelProps } = labelProps;
        const labelClassName = cx(FORM_CHECKBOX_LABEL_CLASS, labelPropsClassName, {
            [FORM_CHECKBOX_LABEL_DISABLED_CLASS]: disabled,
        });

        const onClickFn = onChange || onClick;
        if (!onClickFn) throw new Error(NO_ONCLICK_ONCHANGE_ERROR_MESSAGE);

        const onCheckboxClick = () => !disabled && onClickFn(!checked);
        const onKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === KEY_CODES.SPACEBAR || e.key === KEY_CODES.SPACEBAR_LEGACY) {
                e.preventDefault();
                e.stopPropagation();
                onCheckboxClick();
            }
        };

        return (
            <div
                className={checkboxContainerClassName}
                onClick={onCheckboxClick}
                onKeyDown={onKeyDown}
                tabIndex={0}
                role="checkbox"
                aria-checked={checked}
            >
                <div className={checkboxClassName}>
                    <input
                        type="checkbox"
                        className={FORM_CHECKBOX_CHECKBOX_CLASS}
                        checked={checked}
                        disabled={disabled}
                        onChange={onCheckboxClick}
                        tabIndex={-1}
                        ref={ref}
                        {...rest}
                    />
                    <div className={indicatorClassName} />
                </div>
                {label && (
                    <div className={labelClassName} {...restLabelProps}>
                        {label}
                    </div>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
