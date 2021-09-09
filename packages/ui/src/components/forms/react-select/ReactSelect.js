import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { UI_PREFIX } from '../../../config';

const FORM_SELECT_CLASS = `${UI_PREFIX}__form__field__react-select`;
const FORM_SELECT_INVALID_CLASS = `${UI_PREFIX}__form__field__react-select--invalid`;

export const ReactSelect = React.forwardRef(
    (
        {
            options,
            className = '',
            value,
            invalid = false,
            disabled = false,
            key = 'value',
            isMulti = false,
            creatable = false,
            ...rest
        },
        ref
    ) => {
        const Tag = creatable ? CreatableSelect : Select;
        const invalidClass = invalid ? FORM_SELECT_INVALID_CLASS : '';
        const selectClassName = `${FORM_SELECT_CLASS} ${invalidClass} ${className}`.trim();

        const mappedOptions = useMemo(
            () =>
                options.reduce((all, o) => {
                    all[o[key]] = o;
                    return all;
                }, {}),
            [options, key]
        );
        const selectValue = isMulti
            ? value.map((v) => mappedOptions[v] || { [key]: v, label: v })
            : value
            ? mappedOptions[value]
            : null;

        return (
            <Tag
                className={selectClassName}
                classNamePrefix={`${UI_PREFIX}__form__field__react-select`}
                options={options}
                value={selectValue}
                isDisabled={disabled}
                isMulti={isMulti}
                ref={ref}
                {...rest}
            />
        );
    }
);

ReactSelect.displayName = 'ReactSelect';

ReactSelect.propTypes = {
    options: PropTypes.array.isRequired,
    /** Current Selected value. Specify the `key` value to select an element from the options. */
    value: PropTypes.any,
    /** Customize which is the key to be used to determine the value */
    key: PropTypes.string,
    /** Specifies if the selection is invalid */
    invalid: PropTypes.any,
    /** Allow multiple options to be selected */
    isMulti: PropTypes.bool,
    /** Allows to add an option to the list directly from the input */
    creatable: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
