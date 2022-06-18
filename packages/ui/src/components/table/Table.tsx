import React, { useState, useEffect } from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { TableWrapper } from './TableWrapper';
import { TablePagination } from './TablePagination';
import { TableStatusBar } from './TableStatusBar';
import { TableProps } from './Table.types';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;
const TABLE_STATUS_BAR_CONTAINER = `${UI_PREFIX}__table__status-bar__container`;

const DEFAULT_CONFIG = {
    borderType: 'row' as const,
    zebra: true,
};

const DEFAULT_PAGINATION = {
    pageSize: 20,
};

const DEFAULT_STATUS_BAR = {
    visible: true,
};

export const Table = ({
    columns,
    entries,
    config,
    pagination,
    statusBar,
    className = '',
    elementsProps = {},
    ...rest
}: TableProps): JSX.Element => {
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
    const tableContainerClassName = cx(TABLE_CONTAINER_CLASS, containerClassName);

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
};
