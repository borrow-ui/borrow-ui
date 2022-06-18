import React from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { cx } from '../../utils/classNames';
import { Icon } from '../icon/Icon';
import { TablePaginationPageProps, TablePaginationProps } from './Table.types';

const TABLE_PAGINATION_CLASS = `${UI_PREFIX}__table__pagination`;
const TABLE_PAGINATION_PAGE_CLASS = `${UI_PREFIX}__table__pagination__page`;
const TABLE_PAGINATION_PAGE_ACTIVE_CLASS = `${UI_PREFIX}__table__pagination__page--active`;

export const TablePagination = ({
    tableState,
    setTableState,
    totEntries,
}: TablePaginationProps): JSX.Element => {
    const tablePaginationClassName = TABLE_PAGINATION_CLASS;

    const { page, pageSize } = tableState;
    const maxPage = Math.ceil(totEntries / pageSize);

    const setPage = (n: number) => setTableState({ ...tableState, page: n });
    const commonProps = { page, setPage };

    return (
        <div className={tablePaginationClassName}>
            <PaginationPage
                label={<Icon name="first_page" size="small" />}
                pageNumber={1}
                {...commonProps}
            />
            {page > 2 && <PaginationPage pageNumber={page - 2} {...commonProps} />}
            {page > 1 && <PaginationPage pageNumber={page - 1} {...commonProps} />}
            <PaginationPage pageNumber={page} {...commonProps} />
            {page + 1 <= maxPage && <PaginationPage pageNumber={page + 1} {...commonProps} />}
            {page + 2 <= maxPage && <PaginationPage pageNumber={page + 2} {...commonProps} />}
            <PaginationPage
                label={<Icon name="last_page" size="small" />}
                pageNumber={maxPage}
                {...commonProps}
            />
        </div>
    );
};

TablePagination.propTypes = {};

function PaginationPage({ label, pageNumber, page, setPage }: TablePaginationPageProps) {
    const pageLabel = label || `${pageNumber}`;
    const paginationControlClassName = cx(TABLE_PAGINATION_PAGE_CLASS, {
        [TABLE_PAGINATION_PAGE_ACTIVE_CLASS]: page === pageNumber && !label,
    });
    return (
        <div
            className={paginationControlClassName}
            {...a11yClickableElement({ onClick: () => setPage(pageNumber) })}
        >
            {pageLabel}
        </div>
    );
}
