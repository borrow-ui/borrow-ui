import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

const TABLE_STATUS_BAR_CLASS = `${UI_PREFIX}__table__status-bar`;

export function TableStatusBar({ tableState, totEntries, totOriginalEntries }) {
    const { page, pageSize } = tableState;
    const firstItem = Math.max(1, (page - 1) * pageSize + 1);
    const lastItem = pageSize ? Math.min(totEntries, firstItem + pageSize - 1) : totEntries;

    const originalEntries =
        totEntries !== totOriginalEntries ? `(${totOriginalEntries} total)` : '';

    return (
        <div className={TABLE_STATUS_BAR_CLASS}>
            {totEntries > 0 && (
                <>
                    Showing items {firstItem}-{lastItem} out of {totEntries} {originalEntries}
                </>
            )}
            {!totEntries && 'No entries'}
        </div>
    );
}

TableStatusBar.propTypes = {
    tableState: PropTypes.object.isRequired,
    totEntries: PropTypes.number,
    totOriginalEntries: PropTypes.number,
};
