import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { SPACEBAR_CODE } from './constants';

const FORM_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__checkbox`;
const FORM_CHECKBOX_CHECKED_CLASS = `${UI_PREFIX}__form__field__checkbox--checked`;
const FORM_CHECKBOX_DISABLED_CLASS = `${UI_PREFIX}__form__field__checkbox--disabled`;
const FORM_CHECKBOX_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__checkbox__checkbox`;
const FORM_CHECKBOX_INDICATOR_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator`;
const FORM_CHECKBOX_INDICATOR_CHECKED_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator--checked`;
const FORM_CHECKBOX_INDICATOR_DISABLED_CLASS = `${UI_PREFIX}__form__field__checkbox__indicator--disabled`;
const FORM_LABEL_CLASS = `${UI_PREFIX}__form__field__checkbox__label`;

export function Checkbox({ checked, onClick, label, disabled, ...rest }) {
    const checkedCheckboxClass = checked ? FORM_CHECKBOX_CHECKED_CLASS : '';
    const disabledCheckboxClass = disabled ? FORM_CHECKBOX_DISABLED_CLASS : '';
    const checkboxClass = `${FORM_CHECKBOX_CLASS} ${checkedCheckboxClass} ${disabledCheckboxClass}`;
    const checkedCheckboxIndicatorClass = checked ? FORM_CHECKBOX_INDICATOR_CHECKED_CLASS : '';
    const disabledCheckboxIndicatorClass = disabled ? FORM_CHECKBOX_INDICATOR_DISABLED_CLASS : '';
    const indicatorClass = `${FORM_CHECKBOX_INDICATOR_CLASS} ${checkedCheckboxIndicatorClass} ${disabledCheckboxIndicatorClass}`;
    const labelClass = `${FORM_LABEL_CLASS}`;

    const onCheckboxClick = () => !disabled && onClick(!checked);
    const onKeyDown = e => {
        if (e.keyCode === SPACEBAR_CODE) {
            e.preventDefault();
            e.stopPropagation();
            onCheckboxClick();
        }
    };

    return (
        <div className={checkboxClass} onClick={onCheckboxClick} onKeyDown={onKeyDown} tabIndex="0">
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
            {label && <div className={labelClass}>{label}</div>}
        </div>
    );
}

Checkbox.propTypes = {
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: propTypesChildren,
};
