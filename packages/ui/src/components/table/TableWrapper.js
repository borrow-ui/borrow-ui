import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

const TABLE_CLASS = `${UI_PREFIX}__table`;

export function TableWrapper({
    className = '',
    tableConfig,
    tableState,
    setTableState,
    entries,
    elementsProps,
}) {
    const tableClassName = `${TABLE_CLASS} ${className}`;

    const commonProps = { tableConfig, tableState, setTableState, entries, elementsProps };

    return (
        <table className={tableClassName}>
            <TableHead {...commonProps} />
            <TableBody {...commonProps} />
        </table>
    );
}

TableWrapper.propTypes = {
    className: PropTypes.string,
    tableConfig: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
    setTableState: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
    elementsProps: PropTypes.object,
};
