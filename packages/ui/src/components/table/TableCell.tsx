import React from 'react';

import { UI_PREFIX } from '../../config';
import {
    TableCellContainerNameType,
    TableCellContainerPropsType,
    TableCellContainerPropsValueType,
    TableCellElementsPropsType,
    TableCellProps,
    TableColumnType,
    TableConfigType,
    TableEntryType,
} from './Table.types';

const TABLE_CELL_CLASS = `${UI_PREFIX}__table__cell`;
const TABLE_CELL_CONTENT_CLASS = `${UI_PREFIX}__table__cell__content`;
// verticalAlignClassName is computed by using column.verticalAlign or tableConfig.verticalAlign:
//  `${UI_PREFIX}__table__cell--vertical-align-${tableConfig.verticalAlign}`;
// borderClassName is computed by using tableConfig.borderType:
//  `${UI_PREFIX}__table__cell--border-${tableConfig.borderType}`;
// alignClassName is computed by using column.align or tableConfig.align:
//  `${UI_PREFIX}__table__cell__content--align-${tableConfig.align}`;

export const TableCell = ({
    children,
    className,
    tableConfig,
    Tag = 'td',
    elementsProps,
    column,
    entry,
    ...rest
}: TableCellProps): JSX.Element => {
    const borderClassName = `${UI_PREFIX}__table__cell--border-${tableConfig.borderType}`;

    const cellElementProps = getContainerProps(elementsProps, 'cellProps', column, entry);

    const {
        className: cellPropsClassName = '',
        verticalAlign,
        ...cellOtherProps
    } = cellElementProps;
    const alignV = verticalAlign || tableConfig.verticalAlign || '';
    const verticalAlignClassName = alignV
        ? `${UI_PREFIX}__table__cell--vertical-align-${alignV}`
        : '';

    const cellClassName =
        `${TABLE_CELL_CLASS} ${borderClassName} ${verticalAlignClassName} ${className} ${cellPropsClassName}`.trim();

    const cellContentElementProps = getContainerProps(
        elementsProps,
        'cellContentProps',
        column,
        entry
    );

    const {
        className: cellContentPropsClassName = '',
        align,
        ...cellContentOtherProps
    } = cellContentElementProps;
    // align applies only to content
    const alignH = entry !== undefined ? align || tableConfig.align || '' : '';
    const alignClassName = alignH ? `${UI_PREFIX}__table__cell__content--align-${alignH}` : '';

    const cellContentClassName =
        `${TABLE_CELL_CONTENT_CLASS} ${alignClassName} ${cellContentPropsClassName}`.trim();

    return (
        <Tag
            className={cellClassName}
            {...(rest as React.TdHTMLAttributes<HTMLTableCellElement>)}
            {...(cellOtherProps as React.TdHTMLAttributes<HTMLTableCellElement>)}
        >
            <div className={cellContentClassName} {...cellContentOtherProps}>
                {children}
            </div>
        </Tag>
    );
};

export function getContainerProps(
    elementsProps: TableCellElementsPropsType,
    containerName: TableCellContainerNameType,
    column: TableColumnType,
    entry?: TableEntryType
): TableCellContainerPropsType {
    const cProps = elementsProps[containerName] || ({} as TableCellContainerPropsValueType);
    const { align, verticalAlign } = column;
    const { getProps, ...restElementsProps } = cProps;
    const {
        align: cAlign,
        verticalAlign: cVerticalAlign,
        ...computedProps
    } = getProps ? getProps(column, entry) : ({} as TableConfigType);
    let props = { ...restElementsProps };
    if (containerName === 'cellProps') {
        if (verticalAlign) props.verticalAlign = verticalAlign;
        if (cVerticalAlign) props.verticalAlign = cVerticalAlign;
    }
    if (containerName === 'cellContentProps') {
        if (align) props.align = align;
        if (cAlign) props.align = cAlign;
    }
    if (getProps) props = { ...props, ...computedProps };
    return props;
}
