import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

import { TableCell } from './TableCell';

const TABLE_HEAD_CLASS = `${UI_PREFIX}__table__head`;
const TABLE_HEAD_ROW_CLASS = `${UI_PREFIX}__table__head__row`;
const TABLE_HEAD_CELL_CLASS = `${UI_PREFIX}__table__head__cell`;

export function TableHead({ className, tableConfig, tableState, setTableState, entries }) {
    const theadClassName = `${TABLE_HEAD_CLASS} ${className}`;
    const theadRowClassName = `${TABLE_HEAD_ROW_CLASS} ${className}`;

    const columns = tableState.columns;

    return (
        <thead className={theadClassName}>
            <tr className={theadRowClassName}>
                {columns.map(col => {
                    return (
                        <TableCell
                            Tag="th"
                            className={TABLE_HEAD_CELL_CLASS}
                            key={`table-head-cell-${col.prop}`}
                            style={{ width: col.width }}
                        >
                            {col.title}
                        </TableCell>
                    );
                })}
            </tr>
        </thead>
    );
}

TableHead.propTypes = {
    className: PropTypes.string,
    tableConfig: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
    setTableState: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
};
