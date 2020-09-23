import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

import { Icon } from '../icon/Icon';
import { SearchBar } from '../search-bar/SearchBar';

import { TableWrapper } from './TableWrapper';
import { TablePagination } from './TablePagination';
import { TableStatusBar } from './TableStatusBar';

// import 'style/component/table/table.scss';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;
const TABLE_SEARCH_BAR_CONTAINER = `${UI_PREFIX}__table__search-bar__container`;
const TABLE_STATUS_BAR_CONTAINER = `${UI_PREFIX}__table__status-bar__container`;

const DEFAULT_CONFIG = {
    borderType: 'row',
    zebra: true,
};

const DEFAULT_PAGINATION = {
    pageSize: 20,
};

const DEFAULT_SEARCH_BAR = {
    visible: false,
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

    const [tableState, setTableState] = useState({
        columns: [...columns],
        page: 1,
        pageSize: tablePagination.pageSize,
    });

    const [filteredEntries, setFilteredEntries] = useState(entries);

    const totOriginalEntries = entries.length;
    const totEntries = filteredEntries.length;

    const { className: containerClassName = '', ...containerProps } =
        elementsProps.containerProps || {};
    const tableContainerClassName = `${TABLE_CONTAINER_CLASS} ${containerClassName || ''}`;

    const startEntry = (tableState.page - 1) * tableState.pageSize;
    const paginatedEntries = !tablePagination.pageSize
        ? filteredEntries
        : filteredEntries.slice(startEntry, startEntry + tableState.pageSize);

    // TableWrapper: used to implement fixed header / columns in next update
    return (
        <div className={tableContainerClassName} {...containerProps}>
            {tableSearchBar.visible && (
                <div className={TABLE_SEARCH_BAR_CONTAINER}>
                    <SearchBar
                        entries={entries}
                        setFilteredEntries={setFilteredEntries}
                        beforeInput={<Icon name="search" size="small" className="m-r-5" />}
                        inputProps={{ placeholder: 'Type here to filter entries...' }}
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
                        totEntries={totEntries}
                        totOriginalEntries={totOriginalEntries}
                    />
                    {tablePagination.pageSize !== 0 && (
                        <TablePagination
                            tableState={tableState}
                            setTableState={setTableState}
                            totEntries={totEntries}
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
    }),
    searchBar: PropTypes.shape({
        visible: PropTypes.bool,
    }),
    statusBar: PropTypes.shape({
        visible: PropTypes.bool,
    }),
    className: PropTypes.string,
    elementsProps: PropTypes.object,
};
