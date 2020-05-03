import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { UI_PREFIX } from '../../../config';

const FORM_SELECT_CLASS = `${UI_PREFIX}__form__field__react-select`;
const FORM_SELECT_INVALID_CLASS = `${UI_PREFIX}__form__field__react-select--invalid`;

export function ReactSelect({
    options,
    className = '',
    value,
    invalid = false,
    disabled = false,
    key = 'value',
    isMulti = false,
    creatable = false,
    ...rest
}) {
    const Tag = creatable ? CreatableSelect : Select;
    const invalidClass = invalid ? FORM_SELECT_INVALID_CLASS : '';
    const selectClassName = `${FORM_SELECT_CLASS} ${invalidClass} ${className}`;

    const mappedOptions = useMemo(
        () =>
            options.reduce((all, o) => {
                all[o[key]] = o;
                return all;
            }, {}),
        [options, key]
    );
    const selectValue = isMulti
        ? value.map(v => mappedOptions[v] || { [key]: v, label: v })
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
            {...rest}
        />
    );
}

ReactSelect.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    invalid: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.string,
    className: PropTypes.string,
    isMulti: PropTypes.bool,
    creatable: PropTypes.bool,
};
