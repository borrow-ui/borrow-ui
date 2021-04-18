import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { filterEntries } from '../../utils/filters';

import { Icon } from '../icon/Icon';
import { SearchBar } from '../search-bar/SearchBar';

import { TableWrapper } from './TableWrapper';
import { TablePagination } from './TablePagination';
import { TableStatusBar } from './TableStatusBar';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;
const TABLE_SEARCH_BAR_CONTAINER = `${UI_PREFIX}__table__search-bar__container`;
const TABLE_STATUS_BAR_CONTAINER = `${UI_PREFIX}__table__status-bar__container`;

const DEFAULT_CONFIG = {
    borderType: 'row',
    zebra: true,
};

const DEFAULT_PAGINATION = {
    pageSize: 20,
    autoPaginate: true,
};

const DEFAULT_SEARCH_BAR = {
    visible: false,
    initialSearch: undefined,
};

const DEFAULT_STATUS_BAR = {
    visible: true,
};

export function Table({
    columns,
    entries,
    config,
    pagination,
    searchBar,
    statusBar,
    className = '',
    elementsProps = {},
}) {
    const tableConfig = { ...DEFAULT_CONFIG, ...config };
    const tablePagination = { ...DEFAULT_PAGINATION, ...pagination };
    const tableSearchBar = { ...DEFAULT_SEARCH_BAR, ...searchBar };
    const tableStatusBar = { ...DEFAULT_STATUS_BAR, ...statusBar };

    const [search, setSearch] = useState(tableSearchBar.initialSearch);

    const [tableState, setTableState] = useState({
        columns: [...columns],
        page: 1,
        pageSize: tablePagination.pageSize,
    });

    const [filteredEntries, setFilteredEntries] = useState(entries);

    const resetPage = () => setTableState((tableState) => ({ ...tableState, page: 1 }));

    useEffect(() => {
        const filteredSearchedEntries = search
            ? filterEntries(entries, [search], {
                  stringIncludes: true,
              })
            : entries;
        setFilteredEntries(filteredSearchedEntries);
    }, [entries, search]);

    useEffect(() => {
        resetPage();
    }, [search]);

    const updateSearch = (value) => {
        setSearch(value);
        resetPage();
    };

    // if totEntries is passed, it should override the counted one
    const totOriginalEntries = entries.length;
    const totFilteredEntries = filteredEntries.length;

    const { className: containerClassName = '', ...containerProps } =
        elementsProps.containerProps || {};
    const tableContainerClassName = `${TABLE_CONTAINER_CLASS} ${containerClassName || ''}`;

    const startEntry = (tableState.page - 1) * tableState.pageSize;
    const paginatedEntries =
        !tablePagination.pageSize || !tablePagination.autoPaginate
            ? filteredEntries
            : filteredEntries.slice(startEntry, startEntry + tableState.pageSize);

    // TableWrapper: used to implement fixed header / columns in next update
    return (
        <div className={tableContainerClassName} {...containerProps}>
            {tableSearchBar.visible && (
                <div className={TABLE_SEARCH_BAR_CONTAINER}>
                    <SearchBar
                        globalSearch={search}
                        setGlobalSearch={updateSearch}
                        beforeInput={<Icon name="search" size="small" className="m-r-5" />}
                        inputProps={{ placeholder: 'Type here to filter entries...' }}
                        initialSearch={search}
                    />
                </div>
            )}
            <TableWrapper
                className={className}
                tableState={tableState}
                setTableState={setTableState}
                entries={paginatedEntries}
                tableConfig={tableConfig}
                elementsProps={elementsProps}
            />
            {tableStatusBar.visible && (
                <div className={TABLE_STATUS_BAR_CONTAINER}>
                    <TableStatusBar
                        tableState={tableState}
                        totEntries={totFilteredEntries}
                        totOriginalEntries={totOriginalEntries}
                    />
                    {tablePagination.pageSize !== 0 && (
                        <TablePagination
                            tableState={tableState}
                            setTableState={setTableState}
                            totEntries={totFilteredEntries}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            prop: PropTypes.string.isRequired,
            title: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            padding: PropTypes.number,
        }).isRequired
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({
        borderType: PropTypes.oneOf(['none', 'row', 'cell']),
        verticalAlign: PropTypes.oneOf(['top', 'bottom']),
        zebra: PropTypes.bool,
    }),
    pagination: PropTypes.shape({
        pageSize: PropTypes.number,
        autoPaginate: PropTypes.bool,
    }),
    searchBar: PropTypes.shape({
        visible: PropTypes.bool,
        initialSearch: PropTypes.string,
    }),
    statusBar: PropTypes.shape({
        visible: PropTypes.bool,
    }),
    className: PropTypes.string,
    elementsProps: PropTypes.object,
};
