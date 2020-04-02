import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

import { TableWrapper } from './TableWrapper';
import { TablePagination } from './TablePagination';
import { TableStatusBar } from './TableStatusBar';

// import 'style/component/table/table.scss';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;
const TABLE_STATUS_BAR = `${UI_PREFIX}__table__status-bar`;

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
}) {
    const tableConfig = { ...DEFAULT_CONFIG, ...config };
    const tablePagination = { ...DEFAULT_PAGINATION, ...pagination };
    const tableStatusBar = { ...DEFAULT_STATUS_BAR, ...statusBar };

    const totEntries = entries.length;

    const [tableState, setTableState] = useState({
        columns: [...columns],
        page: 1,
        pageSize: tablePagination.pageSize,
    });

    const { className: containerClassName = '', ...containerProps } =
        elementsProps.containerProps || {};
    const tableContainerClassName = `${TABLE_CONTAINER_CLASS} ${containerClassName || ''}`;

    const startEntry = (tableState.page - 1) * tableState.pageSize;
    const filteredEntries = !tablePagination.pageSize
        ? entries
        : entries.slice(startEntry, startEntry + tableState.pageSize);

    // TableWrapper: used to implement fixed header / columns in next update
    return (
        <div className={tableContainerClassName} {...containerProps}>
            <TableWrapper
                className={className}
                tableState={tableState}
                setTableState={setTableState}
                entries={filteredEntries}
                tableConfig={tableConfig}
                elementsProps={elementsProps}
            />
            {tableStatusBar.visible && (
                <div className={TABLE_STATUS_BAR}>
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
    statusBar: PropTypes.shape({
        visible: PropTypes.bool,
    }),
    className: PropTypes.string,
    elementsProps: PropTypes.object,
};
