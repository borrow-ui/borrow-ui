import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { UI_PREFIX } from '../../config';
import { filterEntries } from '../../utils/filters';
import { propTypesChildren } from '../../utils/types';

import { Input } from '../forms/input/Input';

const SEARCH_BAR_CLASS = `${UI_PREFIX}__search-bar`;
const SEARCH_BAR_INPUT_CLASS = `${UI_PREFIX}__search-bar__input`;

export function SearchBar({
    className = '',
    entries,
    initialSearch,
    setFilteredEntries,
    stringIncludes,
    filterEntriesFunction = filterEntries,
    globalSearch,
    setGlobalSearch,
    debounceDelay = 400,
    inputProps = {},
    beforeInput,
    afterInput,
    ...rest
}) {
    const [search, setSearch] = useState(initialSearch);

    const searchBarClassName = `${SEARCH_BAR_CLASS} ${className}`.trim();

    const doSearch = (value, currentEntries) => {
        if (setFilteredEntries) {
            if (value) {
                // filter the entries based on value and options
                const filteredEntries = filterEntriesFunction(currentEntries, [value], {
                    stringIncludes,
                });
                setFilteredEntries(filteredEntries);
            } else {
                // if a value is not specified, all entries should be seen
                setFilteredEntries(entries);
            }
            // in case a callback to set the search value is passed, call it
            setGlobalSearch && setGlobalSearch(value);
        }
    };

    const debouncedSearch = useCallback(
        debounce((value) => doSearch(value, entries), debounceDelay),
        [entries, debounceDelay] // Debounce the actual search
    );

    const changeSearch = (value) => {
        setSearch(value);
        debouncedSearch(value);
    };

    // Execute the search on load only if initialSearch is set
    useEffect(() => {
        if (initialSearch) doSearch(initialSearch, entries);
    }, [initialSearch]); // eslint-disable-line

    // If search value is stored outside the component,
    // update the search box and execute search when it changes outside as well
    useEffect(() => {
        if (globalSearch !== search) {
            setSearch(globalSearch);
            doSearch(globalSearch, entries);
        }
    }, [globalSearch]); // eslint-disable-line

    const { className: inputPropsClassName = '', ...restInputProps } = inputProps;
    const inputClassName = `${SEARCH_BAR_INPUT_CLASS} ${inputPropsClassName}`.trim();

    return (
        <div className={searchBarClassName} {...rest}>
            {beforeInput && beforeInput}
            <Input
                value={search || ''}
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
    /** Initial value of the search bar */
    initialSearch: PropTypes.string,
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
    /** Value of the search stored outside the component */
    globalSearch: PropTypes.string,
    /** Callback to set value of the search outside the component */
    setGlobalSearch: PropTypes.func,
    /** Specify a delay in ms to do search when the input changes */
    debounceDelay: PropTypes.bool,
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
