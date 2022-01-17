import React from 'react';

import { UI_PREFIX } from '../../config';

import { TextProps } from './Text.types';

const TEXT_CLASS = `${UI_PREFIX}__text`;
const TEXT_BIG_CLASS = `${UI_PREFIX}__text--big`;
const TEXT_SMALL_CLASS = `${UI_PREFIX}__text--small`;

export const Text = ({
    size = 'normal',
    tag: Tag = 'div',
    className = '',
    children,
    ...rest
}: TextProps): JSX.Element => {
    const sizeClassName =
        size === 'big' ? TEXT_BIG_CLASS : size === 'small' ? TEXT_SMALL_CLASS : '';
    const textClassName = `${TEXT_CLASS} ${sizeClassName} ${className}`.trim();

    return (
        <Tag className={textClassName} {...rest}>
            {children}
        </Tag>
    );
};
