import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { TableHeadProps } from './Table.types';
import { TableCell } from './TableCell';

const TABLE_HEAD_CLASS = `${UI_PREFIX}__table__head`;
const TABLE_HEAD_ROW_CLASS = `${UI_PREFIX}__table__head__row`;
const TABLE_HEAD_CELL_CLASS = `${UI_PREFIX}__table__head__cell`;

export const TableHead = ({
    className = '',
    tableConfig,
    tableState,
    elementsProps,
}: TableHeadProps): JSX.Element => {
    const theadClassName = cx(TABLE_HEAD_CLASS, className);
    const theadRowClassName = cx(TABLE_HEAD_ROW_CLASS, className);

    const columns = tableState.columns;

    return (
        <thead className={theadClassName}>
            <tr className={theadRowClassName}>
                {columns.map((col) => {
                    return (
                        <TableCell
                            Tag="th"
                            className={TABLE_HEAD_CELL_CLASS}
                            key={`table-head-cell-${col.prop}`}
                            style={{ width: col.width }}
                            tableConfig={tableConfig}
                            column={col}
                            elementsProps={elementsProps}
                        >
                            {col.title}
                        </TableCell>
                    );
                })}
            </tr>
        </thead>
    );
};

TableHead.propTypes = {};
