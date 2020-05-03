import React from 'react';
import PropTypes from 'prop-types';

import { SPACEBAR_CODE } from './constants';
import { UI_PREFIX } from '../../config';

const FORM_TOGGLE_CLASS = `${UI_PREFIX}__form__field__toggle`;
const FORM_TOGGLE_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle--checked`;
const FORM_TOGGLE_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle--disabled`;
const FORM_TOGGLE_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__toggle__checkbox`;
const FORM_TOGGLE_SWITCH_CLASS = `${UI_PREFIX}__form__field__toggle__switch`;
const FORM_TOGGLE_SWITCH_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--checked`;
const FORM_TOGGLE_SWITCH_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--disabled`;

export function Toggle({ checked, onClick, disabled, ...rest }) {
    const checkedToggleClass = checked ? FORM_TOGGLE_CHECKED_CLASS : '';
    const disabledToggleClass = disabled ? FORM_TOGGLE_DISABLED_CLASS : '';
    const toggleClass = `${FORM_TOGGLE_CLASS} ${checkedToggleClass} ${disabledToggleClass}`;
    const checkedSwitchClass = checked ? FORM_TOGGLE_SWITCH_CHECKED_CLASS : '';
    const disabledSwitchClass = disabled ? FORM_TOGGLE_SWITCH_DISABLED_CLASS : '';
    const switchClass = `${FORM_TOGGLE_SWITCH_CLASS} ${checkedSwitchClass} ${disabledSwitchClass}`;

    const onToggleClick = () => !disabled && onClick(!checked);
    const onKeyDown = e => {
        if (e.keyCode === SPACEBAR_CODE) {
            e.preventDefault();
            e.stopPropagation();
            onToggleClick();
        }
    };
    return (
        <div className={toggleClass} onClick={onToggleClick} onKeyDown={onKeyDown} tabIndex="0">
            <input
                type="checkbox"
                className={FORM_TOGGLE_CHECKBOX_CLASS}
                checked={checked}
                disabled={disabled}
                onChange={onToggleClick}
                tabIndex="-1"
                {...rest}
            />
            <div className={switchClass} disabled={disabled} />
        </div>
    );
}

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
};
