import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { filterEntries } from '../../utils/filters';
import { propTypesChildren } from '../../utils/types';

import { Input } from '../forms/input/Input';

const SEARCH_BAR_CLASS = `${UI_PREFIX}__search-bar`;
const SEARCH_BAR_INPUT_CLASS = `${UI_PREFIX}__search-bar__input`;

export function SearchBar({
    className = '',
    entries,
    setFilteredEntries,
    stringIncludes,
    filterEntriesFunction = filterEntries,
    inputProps = {},
    beforeInput,
    afterInput,
    ...rest
}) {
    const [search, setSearch] = useState(null);

    const searchBarClassName = `${SEARCH_BAR_CLASS} ${className}`.trim();

    const changeSearch = (value) => {
        setSearch(value);
        doSearch(value);
    };

    const doSearch = (value) => {
        const filteredEntries = filterEntriesFunction(entries, [value], { stringIncludes });
        setFilteredEntries && setFilteredEntries(filteredEntries);
    };

    const { className: inputPropsClassName = '', ...restInputProps } = inputProps;
    const inputClassName = `${SEARCH_BAR_INPUT_CLASS} ${inputPropsClassName}`.trim();

    return (
        <div className={searchBarClassName} {...rest}>
            {beforeInput && beforeInput}
            <Input
                value={search}
                onChange={(e) => changeSearch(e.target.value)}
                className={inputClassName}
                {...restInputProps}
            />
            {afterInput && afterInput}
        </div>
    );
}

SearchBar.propTypes = {
    /** The full list of entries to filter */
    entries: PropTypes.array.isRequired,
    /** A function called after the list is filtered */
    setFilteredEntries: PropTypes.func,
    /** Keep elements if the search string is included in any of the values */
    stringIncludes: PropTypes.bool,
    /** Function that will perform the filtering.
     * By default the function will be `filterEntries`
     * exported in `src/utils/filter.js`.
     * The function will take the following arguments:
     *
     * - `entries`: the full list of entries;
     * - `values`: a list of values to filter by (by default, the one coming from the input);
     * - `options`: an object with options.
     *
     * `options` has the following properties:
     *
     * - `stringIncludes`: a boolean as described above. */
    filterEntriesFunction: PropTypes.func,
    /** Props forwarded to Input component */
    inputProps: PropTypes.shape({
        className: PropTypes.string,
    }),
    /** Elements to render before Input */
    beforeInput: propTypesChildren,
    /** Elements to render before Input */
    afterInput: propTypesChildren,
    className: PropTypes.string,
};
