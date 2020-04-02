import React from 'react';
import PropTypes from 'prop-types';
import { propTypesChildren } from 'utils/types';
import { UI_PREFIX } from 'config';

const TABLE_CELL_CLASS = `${UI_PREFIX}__table__cell`;
const TABLE_CELL_CONTENT_CLASS = `${UI_PREFIX}__table__cell__content`;
// const TABLE_CELL_VERTICAL_ALIGN_TOP_CLASS = `${UI_PREFIX}__table__cell--vertical-align-top`;
// const TABLE_CELL_VERTICAL_ALIGN_BOTTOM_CLASS = `${UI_PREFIX}__table__cell--vertical-align-bottom`;
// const TABLE_CELL_BORDER_ROW_CLASS = `${UI_PREFIX}__table__cell--border-row`;
// const TABLE_CELL_BORDER_CELL_CLASS = `${UI_PREFIX}__table__cell--border-cell`;

export function TableCell({
    children,
    className,
    tableConfig,
    Tag = 'td',
    elementsProps,
    column,
    entry,
    ...rest
}) {
    const verticalAlignClassName = tableConfig.verticalAlign
        ? `${UI_PREFIX}__table__cell--vertical-align-${tableConfig.verticalAlign}`
        : '';
    const borderClassName = tableConfig.borderType
        ? `${UI_PREFIX}__table__cell--border-${tableConfig.borderType}`
        : '';

    const cellElementProps = !elementsProps.cellProps
        ? {}
        : elementsProps.cellProps.getProps
        ? elementsProps.cellProps.getProps(column, entry)
        : elementsProps.cellProps;

    const { className: cellPropsClassName = '', ...cellOtherProps } = cellElementProps || {};
    const cellClassName = `${TABLE_CELL_CLASS} ${className} ${borderClassName} ${verticalAlignClassName} ${cellPropsClassName}`;

    const cellContentElementProps = !elementsProps.cellProps
        ? {}
        : elementsProps.cellContentProps.getProps
        ? elementsProps.cellContentProps.getProps(column, entry)
        : elementsProps.cellContentProps;

    const { className: cellContentPropsClassName = '', ...cellContentOtherProps } =
        cellContentElementProps || {};

    const cellContentClassName = `${TABLE_CELL_CONTENT_CLASS} ${cellContentPropsClassName}`;

    return (
        <Tag className={cellClassName} {...rest} {...cellOtherProps}>
            <div className={cellContentClassName} {...cellContentOtherProps}>
                {children}
            </div>
        </Tag>
    );
}

TableCell.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    Tag: PropTypes.oneOf(['td', 'th']),
    tableConfig: PropTypes.object.isRequired,
    elementsProps: PropTypes.object,
    column: PropTypes.object,
    entry: PropTypes.object,
};
