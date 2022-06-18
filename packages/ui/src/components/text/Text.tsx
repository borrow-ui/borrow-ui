import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
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
    const textClassName = cx(TEXT_CLASS, className, {
        [TEXT_BIG_CLASS]: size === 'big',
        [TEXT_SMALL_CLASS]: size === 'small',
    });

    return (
        <Tag className={textClassName} {...rest}>
            {children}
        </Tag>
    );
};
