import React from 'react';

import { UI_PREFIX } from '../../../config';

import { KEY_CODES } from '../../../utils/constants';
import { cx } from '../../../utils/classNames';
import { ToggleProps } from './Toggle.types';

const FORM_TOGGLE_CLASS = `${UI_PREFIX}__form__field__toggle`;
const FORM_TOGGLE_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle--checked`;
const FORM_TOGGLE_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle--disabled`;
const FORM_TOGGLE_CHECKBOX_CLASS = `${UI_PREFIX}__form__field__toggle__checkbox`;
const FORM_TOGGLE_SWITCH_CLASS = `${UI_PREFIX}__form__field__toggle__switch`;
const FORM_TOGGLE_SWITCH_CHECKED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--checked`;
const FORM_TOGGLE_SWITCH_DISABLED_CLASS = `${UI_PREFIX}__form__field__toggle__switch--disabled`;

export const NO_ONCLICK_ONCHANGE_ERROR_MESSAGE =
    'At least one of onChange or onClick property is required.';

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
    ({ checked, onClick, onChange, disabled, className = '', ...rest }, ref): JSX.Element => {
        const toggleClassName = cx(FORM_TOGGLE_CLASS, className, {
            [FORM_TOGGLE_CHECKED_CLASS]: checked,
            [FORM_TOGGLE_DISABLED_CLASS]: disabled,
        });
        const switchClassName = cx(FORM_TOGGLE_SWITCH_CLASS, {
            [FORM_TOGGLE_SWITCH_CHECKED_CLASS]: checked,
            [FORM_TOGGLE_SWITCH_DISABLED_CLASS]: disabled,
        });

        const onClickFn = onChange || onClick;
        if (!onClickFn) throw new Error(NO_ONCLICK_ONCHANGE_ERROR_MESSAGE);

        const onToggleClick = () => !disabled && onClickFn(!checked);
        const onKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === KEY_CODES.SPACEBAR || e.key === KEY_CODES.SPACEBAR_LEGACY) {
                e.preventDefault();
                e.stopPropagation();
                onToggleClick();
            }
        };
        return (
            <div
                className={toggleClassName}
                onClick={onToggleClick}
                onKeyDown={onKeyDown}
                tabIndex={0}
                role="checkbox"
                aria-checked={checked}
            >
                <input
                    type="checkbox"
                    className={FORM_TOGGLE_CHECKBOX_CLASS}
                    checked={checked}
                    disabled={disabled}
                    onChange={onToggleClick}
                    tabIndex={-1}
                    ref={ref}
                    {...rest}
                />
                <div className={switchClassName} />
            </div>
        );
    }
);

Toggle.displayName = 'Toggle';
