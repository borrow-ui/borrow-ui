import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

import { Icon } from '../icon/Icon';
import { propTypesChildren } from '../../utils/types';

const TABLE_PAGINATION_CLASS = `${UI_PREFIX}__table__pagination`;
const TABLE_PAGINATION_PAGE_CLASS = `${UI_PREFIX}__table__pagination__page`;
const TABLE_PAGINATION_PAGE_ACTIVE_CLASS = `${UI_PREFIX}__table__pagination__page--active`;

export function TablePagination({ tableState, setTableState, totEntries }) {
    const tablePaginationClassName = TABLE_PAGINATION_CLASS;

    const { page, pageSize } = tableState;
    const maxPage = Math.ceil(totEntries / pageSize);

    const setPage = n => setTableState({ ...tableState, page: n });
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
}

TablePagination.propTypes = {
    tableState: PropTypes.object.isRequired,
    setTableState: PropTypes.func.isRequired,
    totEntries: PropTypes.number.isRequired,
};

function PaginationPage({ label, pageNumber, page, setPage }) {
    const pageLabel = label || `${pageNumber}`;
    const activePageClassName =
        page === pageNumber && !label ? TABLE_PAGINATION_PAGE_ACTIVE_CLASS : '';
    const paginationControlClassName = `${TABLE_PAGINATION_PAGE_CLASS} ${activePageClassName}`;
    return (
        <div className={paginationControlClassName} onClick={() => setPage(pageNumber)}>
            {pageLabel}
        </div>
    );
}

PaginationPage.propTypes = {
    label: propTypesChildren,
    pageNumber: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};
