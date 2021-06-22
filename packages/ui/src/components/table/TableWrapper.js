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
    entries,
    elementsProps,
    ...rest
}) {
    const tableClassName = `${TABLE_CLASS} ${className}`;

    const commonProps = { tableConfig, tableState, elementsProps };

    return (
        <table className={tableClassName} {...rest}>
            <TableHead {...commonProps} />
            <TableBody {...commonProps} entries={entries} />
        </table>
    );
}

TableWrapper.propTypes = {
    className: PropTypes.string,
    tableConfig: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
    elementsProps: PropTypes.object,
};
