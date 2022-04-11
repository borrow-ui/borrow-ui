import React from 'react';

import { UI_PREFIX } from '../../config';

import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableWrapperProps } from './Table.types';

const TABLE_CLASS = `${UI_PREFIX}__table`;

export const TableWrapper = ({
    className = '',
    tableConfig,
    tableState,
    entries,
    elementsProps,
    ...rest
}: TableWrapperProps): JSX.Element => {
    const tableClassName = `${TABLE_CLASS} ${className}`;

    const commonProps = { tableConfig, tableState, elementsProps };

    return (
        <table className={tableClassName} {...rest}>
            <TableHead {...commonProps} />
            <TableBody {...commonProps} entries={entries} />
        </table>
    );
};
