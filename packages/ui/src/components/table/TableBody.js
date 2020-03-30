import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

import { TableCell } from './TableCell';

const TABLE_BODY_CLASS = `${UI_PREFIX}__table__body`;
const TABLE_BODY_ROW_CLASS = `${UI_PREFIX}__table__body__row`;
const TABLE_BODY_CELL_CLASS = `${UI_PREFIX}__table__body__cell`;

export function TableBody({ className, tableConfig, tableState, setTableState, entries }) {
    const tbodyClassName = `${TABLE_BODY_CLASS} ${className}`;
    const tbodyRowClassName = TABLE_BODY_ROW_CLASS;

    const columns = tableState.columns;

    return (
        <tbody className={tbodyClassName}>
            {entries.map((entry, index) => {
                return (
                    <tr className={tbodyRowClassName} key={`table-body-row-${index}`}>
                        {columns.map(col => {
                            return (
                                <TableCell
                                    className={TABLE_BODY_CELL_CLASS}
                                    key={`table-body-row-${index}-cell-${col.prop}`}
                                    style={{ width: col.width }}
                                >
                                    {entry[col.prop]}
                                </TableCell>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}

TableBody.propTypes = {
    className: PropTypes.string,
    tableConfig: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
    setTableState: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
};
