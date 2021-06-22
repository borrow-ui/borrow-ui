import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

import { TableWrapper } from './TableWrapper';
import { TablePagination } from './TablePagination';
import { TableStatusBar } from './TableStatusBar';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;
const TABLE_STATUS_BAR_CONTAINER = `${UI_PREFIX}__table__status-bar__container`;

const DEFAULT_CONFIG = {
    borderType: 'row',
    zebra: true,
};

const DEFAULT_PAGINATION = {
    pageSize: 20,
};

const DEFAULT_STATUS_BAR = {
    visible: true,
};

export function Table({
    columns,
    entries,
    config,
    pagination,
    statusBar,
    className = '',
    elementsProps = {},
    ...rest
}) {
    const tableConfig = { ...DEFAULT_CONFIG, ...config };
    const tablePagination = { ...DEFAULT_PAGINATION, ...pagination };
    const tableStatusBar = { ...DEFAULT_STATUS_BAR, ...statusBar };

    const [tableState, setTableState] = useState({
        columns: [...columns],
        page: 1,
        pageSize: tablePagination.pageSize,
    });

    const resetPage = () => setTableState((tableState) => ({ ...tableState, page: 1 }));

    useEffect(() => {
        resetPage();
    }, [entries]);

    const totEntries = entries.length;

    const { className: containerClassName = '', ...containerProps } =
        elementsProps.containerProps || {};
    const tableContainerClassName = `${TABLE_CONTAINER_CLASS} ${containerClassName || ''}`;

    const startEntry = (tableState.page - 1) * tableState.pageSize;
    const paginatedEntries = !tablePagination.pageSize
        ? entries
        : entries.slice(startEntry, startEntry + tableState.pageSize);

    // TableWrapper: used to implement fixed header / columns in next update
    return (
        <div className={tableContainerClassName} {...containerProps}>
            <TableWrapper
                className={className}
                tableState={tableState}
                entries={paginatedEntries}
                tableConfig={tableConfig}
                elementsProps={elementsProps}
                {...rest}
            />
            {tableStatusBar.visible && (
                <div className={TABLE_STATUS_BAR_CONTAINER}>
                    <TableStatusBar tableState={tableState} totEntries={totEntries} />
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
            align: PropTypes.oneOf(['left', 'right', 'center']),
            verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
        }).isRequired
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({
        borderType: PropTypes.oneOf(['none', 'row', 'cell']),
        align: PropTypes.oneOf(['left', 'right', 'center']),
        verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
        zebra: PropTypes.bool,
    }),
    pagination: PropTypes.shape({
        pageSize: PropTypes.number,
    }),
    statusBar: PropTypes.shape({
        visible: PropTypes.bool,
    }),
    className: PropTypes.string,
    elementsProps: PropTypes.shape({
        /** Props added to the cell element (th, td).
         * If `getProps` function is passed, it will be called with two arguments,
         * `column` and `entry`, which represents the current column and the current
         * entry. In the header, `entry` is not passed.
         */
        cellProps: PropTypes.shape({
            getProps: PropTypes.func,
        }),
        /** Props added to the cell content element (the div inside th or td).
         * If `getProps` function is passed, it will be called with two arguments,
         * `column` and `entry`, which represents the current column and the current
         * entry. In the header, `entry` is not passed.
         */
        cellContentProps: PropTypes.shape({
            getProps: PropTypes.func,
        }),
    }),
};
