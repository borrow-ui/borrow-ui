import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';

import { KEY_CODES } from '../../../utils/constants';

const FORM_TOGGLE_CLASS = `${UI_PREFIX}__form__field__toggle`;
const FORM_TOGGLE_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle--checked`;
const FORM_TOGGLE_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle--disabled`;
const FORM_TOGGLE_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__toggle__checkbox`;
const FORM_TOGGLE_SWITCH_CLASS = `${UI_PREFIX}__form__field__toggle__switch`;
const FORM_TOGGLE_SWITCH_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--checked`;
const FORM_TOGGLE_SWITCH_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--disabled`;

export const NO_ONCLICK_ONCHANGE_ERROR_MESSAGE =
    'At least one of onChange or onClick property is required.';

export const Toggle = React.forwardRef(
    ({ checked, onClick, onChange, disabled, className = '', ...rest }, ref) => {
        const checkedToggleClass = checked ? FORM_TOGGLE_CHECKED_CLASS : '';
        const disabledToggleClass = disabled ? FORM_TOGGLE_DISABLED_CLASS : '';
        const toggleClass =
            `${FORM_TOGGLE_CLASS} ${checkedToggleClass} ${disabledToggleClass} ${className}`.trim();
        const checkedSwitchClass = checked ? FORM_TOGGLE_SWITCH_CHECKED_CLASS : '';
        const disabledSwitchClass = disabled ? FORM_TOGGLE_SWITCH_DISABLED_CLASS : '';
        const switchClass = `${FORM_TOGGLE_SWITCH_CLASS} ${checkedSwitchClass} ${disabledSwitchClass}`;

        const onClickFn = onChange || onClick;
        if (!onClickFn) throw new Error(NO_ONCLICK_ONCHANGE_ERROR_MESSAGE);

        const onToggleClick = () => !disabled && onClickFn(!checked);
        const onKeyDown = (e) => {
            if (e.keyCode === KEY_CODES.SPACEBAR) {
                e.preventDefault();
                e.stopPropagation();
                onToggleClick();
            }
        };
        return (
            <div
                className={toggleClass}
                onClick={onToggleClick}
                onKeyDown={onKeyDown}
                tabIndex="0"
                role="checkbox"
                aria-checked={checked}
            >
                <input
                    type="checkbox"
                    className={FORM_TOGGLE_CHECKBOX_CLASS}
                    checked={checked}
                    disabled={disabled}
                    onChange={onToggleClick}
                    tabIndex="-1"
                    ref={ref}
                    {...rest}
                />
                <div className={switchClass} disabled={disabled} />
            </div>
        );
    }
);

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
    /** Function called when the toggle is clicked */
    onClick: PropTypes.func,
    /** Function called when the toggle is clicked (to keep same prop of other fields) */
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
