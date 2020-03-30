import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

import { TableWrapper } from './TableWrapper';

// import 'style/component/table/table.scss';

const TABLE_CONTAINER_CLASS = `${UI_PREFIX}__table__container`;

const DEFAULT_CONFIG = {
    borderType: 'row',
    verticalAlignment: 'middle',
};

export function Table({ columns, entries, config, className = '', elementsProps = {}}) {
    const [tableState, setTableState] = useState({
        columns: [...columns],
        page: 1,
    });

    const tableConfig = { ...DEFAULT_CONFIG, ...config };

    const { className: containerClassName = '', ...containerProps } =
        elementsProps.containerProps || {};
    const tableContainerClassName = `${TABLE_CONTAINER_CLASS} ${containerClassName || ''}`;

    // TableWrapper: used to implement fixed header / columns in next update
    return (
        <div className={tableContainerClassName} {...containerProps}>
            <TableWrapper
                className={className}
                tableState={tableState}
                setTableState={setTableState}
                entries={entries}
                tableConfig={tableConfig}
            />
        </div>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            prop: PropTypes.string.isRequired,
            title: PropTypes.string,
            width: PropTypes.number,
        }).isRequired
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({}),
    className: PropTypes.string,
    elementsProps: PropTypes.object,
};
