import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';
import { propTypesChildren } from '../../../utils/types';
import { KEY_CODES } from '../../../utils/constants';

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

export function Checkbox({
    checked,
    onClick,
    label,
    disabled,
    labelProps = {},
    className = '',
    ...rest
}) {
    const checkboxContainerClass = `${FORM_CHECKBOX_CONTAINER_CLASS} ${className}`;
    const checkedCheckboxClass = checked ? FORM_CHECKBOX_CHECKED_CLASS : '';
    const disabledCheckboxClass = disabled ? FORM_CHECKBOX_DISABLED_CLASS : '';
    const checkboxClass = `${FORM_CHECKBOX_CLASS} ${checkedCheckboxClass} ${disabledCheckboxClass}`;
    const checkedCheckboxIndicatorClass = checked ? FORM_CHECKBOX_INDICATOR_CHECKED_CLASS : '';
    const disabledCheckboxIndicatorClass = disabled ? FORM_CHECKBOX_INDICATOR_DISABLED_CLASS : '';
    const indicatorClass = `${FORM_CHECKBOX_INDICATOR_CLASS} ${checkedCheckboxIndicatorClass} ${disabledCheckboxIndicatorClass}`.trim();
    const { className: labelClassName = '', ...restLabelProps } = labelProps;
    const labelDisabledClass = disabled ? FORM_CHECKBOX_LABEL_DISABLED_CLASS : '';
    const labelClass = `${FORM_CHECKBOX_LABEL_CLASS} ${labelDisabledClass} ${labelClassName}`.trim();

    const onCheckboxClick = () => !disabled && onClick(!checked);
    const onKeyDown = (e) => {
        if (e.keyCode === KEY_CODES.SPACEBAR) {
            e.preventDefault();
            e.stopPropagation();
            onCheckboxClick();
        }
    };

    return (
        <div
            className={checkboxContainerClass}
            onClick={onCheckboxClick}
            onKeyDown={onKeyDown}
            tabIndex="0"
        >
            <div className={checkboxClass}>
                <input
                    type="checkbox"
                    className={FORM_CHECKBOX_CHECKBOX_CLASS}
                    checked={checked}
                    disabled={disabled}
                    onChange={onCheckboxClick}
                    tabIndex="-1"
                    {...rest}
                />
                <div className={indicatorClass} />
            </div>
            {label && (
                <div className={labelClass} {...restLabelProps}>
                    {label}
                </div>
            )}
        </div>
    );
}

Checkbox.propTypes = {
    /** Handler executed when the checkbox container is clicked. Normally, it toggles the value */
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    /** Checkbox own label */
    label: propTypesChildren,
    /** Attributes for label container */
    labelProps: PropTypes.object,
    className: PropTypes.string,
};
