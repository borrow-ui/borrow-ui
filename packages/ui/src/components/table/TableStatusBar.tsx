import React from 'react';

import { UI_PREFIX } from '../../config';
import { TableStatusBarProps } from './Table.types';

const TABLE_STATUS_BAR_CLASS = `${UI_PREFIX}__table__status-bar`;

export function TableStatusBar({ tableState, totEntries }: TableStatusBarProps) {
    const { page, pageSize } = tableState;
    const firstItem = Math.max(1, (page - 1) * pageSize + 1);
    const lastItem = pageSize ? Math.min(totEntries, firstItem + pageSize - 1) : totEntries;

    return (
        <div className={TABLE_STATUS_BAR_CLASS}>
            {totEntries > 0 && (
                <>
                    Showing items {firstItem}-{lastItem} out of {totEntries}
                </>
            )}
            {!totEntries && 'No entries'}
        </div>
    );
}
