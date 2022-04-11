import React from 'react';

import { ColProps, RowProps } from './Grid.types';

export const Row = ({ children, className = '', ...rest }: RowProps): JSX.Element => {
    const rowClassName = `row ${className}`;

    return (
        <div className={rowClassName} {...rest}>
            {children}
        </div>
    );
};

export const Col = ({
    children,
    size = 6,
    className = '',
    colClassName: overrideColClassName,
    ...rest
}: ColProps): JSX.Element => {
    const colSizeClassName = `col-xs-12 col-sm-${size}`;
    const colClassName = `${className} ${overrideColClassName || colSizeClassName}`;

    return (
        <div className={colClassName} {...rest}>
            {children}
        </div>
    );
};
