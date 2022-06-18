import React, { useMemo } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { UI_PREFIX } from '../../../config';
import { cx } from '../../../utils/classNames';
import { MappedOptionsType, ReactSelectProps } from './ReactSelect.types';

const FORM_SELECT_CLASS = `${UI_PREFIX}__form__field__react-select`;
const FORM_SELECT_INVALID_CLASS = `${UI_PREFIX}__form__field__react-select--invalid`;

export const ReactSelect = React.forwardRef<any, ReactSelectProps>(
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
        const selectClassName = cx(FORM_SELECT_CLASS, className, {
            [FORM_SELECT_INVALID_CLASS]: invalid,
        });

        const mappedOptions = useMemo(
            () =>
                options.reduce((all, o) => {
                    all[o[key]] = o;
                    return all;
                }, {} as MappedOptionsType),
            [options, key]
        );
        const selectValue =
            isMulti && Array.isArray(value)
                ? value?.map((v) => mappedOptions[v] || { [key]: v, label: v })
                : value && !Array.isArray(value)
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

ReactSelect.propTypes = {};
