import React from 'react';

import { UI_PREFIX } from '../../config';

import { TableBodyProps } from './Table.types';
import { TableCell } from './TableCell';

const TABLE_BODY_CLASS = `${UI_PREFIX}__table__body`;
const TABLE_BODY_ROW_CLASS = `${UI_PREFIX}__table__body__row`;
const TABLE_BODY_ROW_ODD_CLASS = `${UI_PREFIX}__table__body__row--odd`;
const TABLE_BODY_CELL_CLASS = `${UI_PREFIX}__table__body__cell`;

export const TableBody = ({
    className = '',
    tableConfig,
    tableState,
    elementsProps,
    entries,
}: TableBodyProps): JSX.Element => {
    const tbodyClassName = `${TABLE_BODY_CLASS} ${className}`;

    const columns = tableState.columns;

    return (
        <tbody className={tbodyClassName}>
            {entries.map((entry, index) => {
                const tbodyRowOddClass =
                    tableConfig.zebra && index % 2 !== 0 ? TABLE_BODY_ROW_ODD_CLASS : '';
                const tbodyRowClassName = `${TABLE_BODY_ROW_CLASS} ${tbodyRowOddClass}`;
                return (
                    <tr className={tbodyRowClassName} key={`table-body-row-${index}`}>
                        {columns.map((col) => {
                            return (
                                <TableCell
                                    className={TABLE_BODY_CELL_CLASS}
                                    key={`table-body-row-${index}-cell-${col.prop}`}
                                    style={{ width: col.width }}
                                    tableConfig={tableConfig}
                                    column={col}
                                    entry={entry}
                                    elementsProps={elementsProps}
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
};
