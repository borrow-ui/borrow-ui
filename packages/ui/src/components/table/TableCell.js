import React from 'react';
import PropTypes from 'prop-types';
import { propTypesChildren } from 'utils/types';
import { UI_PREFIX } from 'config';

const TABLE_CELL_CLASS = `${UI_PREFIX}__table__cell`;
const TABLE_CELL_CONTENT_CLASS = `${UI_PREFIX}__table__cell__content`;

export function TableCell({ children, className, Tag = 'td' }) {
    const cellClassName = `${TABLE_CELL_CLASS} ${className}`;
    const cellContentClassName = `${TABLE_CELL_CONTENT_CLASS}`;

    return (
        <Tag className={cellClassName}>
            <div className={cellContentClassName}>{children}</div>
        </Tag>
    );
}

TableCell.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    Tag: PropTypes.oneOf(['td', 'th']),
};
