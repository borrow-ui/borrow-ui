import React from 'react';
import PropTypes from 'prop-types';
import { propTypesChildren } from '../../utils/types';
import { UI_PREFIX } from '../../config';

const TABLE_CELL_CLASS = `${UI_PREFIX}__table__cell`;
const TABLE_CELL_CONTENT_CLASS = `${UI_PREFIX}__table__cell__content`;
// verticalAlignClassName is computed by using column.verticalAlign or tableConfig.verticalAlign:
//  `${UI_PREFIX}__table__cell--vertical-align-${tableConfig.verticalAlign}`;
// borderClassName is computed by using tableConfig.borderType:
//  `${UI_PREFIX}__table__cell--border-${tableConfig.borderType}`;
// alignClassName is computed by using column.align or tableConfig.align:
//  `${UI_PREFIX}__table__cell__content--align-${tableConfig.align}`;

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

    const cellClassName = `${TABLE_CELL_CLASS} ${borderClassName} ${verticalAlignClassName} ${className} ${cellPropsClassName}`.trim();

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

    const cellContentClassName = `${TABLE_CELL_CONTENT_CLASS} ${alignClassName} ${cellContentPropsClassName}`.trim();

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

export function getContainerProps(elementsProps, containerProps, column, entry) {
    const cProps = elementsProps[containerProps] || {};
    const { align, verticalAlign } = column;
    const { getProps, ...restElementsProps } = cProps;
    const { align: cAlign, verticalAlign: cVerticalAlign, ...computedProps } = getProps
        ? getProps(column, entry)
        : {};
    let props = { ...restElementsProps };
    if (containerProps === 'cellProps') {
        if (verticalAlign) props.verticalAlign = verticalAlign;
        if (cVerticalAlign) props.verticalAlign = cVerticalAlign;
    }
    if (containerProps === 'cellContentProps') {
        if (align) props.align = align;
        if (cAlign) props.align = cAlign;
    }
    if (getProps) props = { ...props, ...computedProps };
    return props;
}
