import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { TextContainerProps } from './TextContainer.types';

const TEXT_CONTAINER_CLASS = `${UI_PREFIX}__text-container`;
const TEXT_CONTAINER_CENTERED_CLASS = `${UI_PREFIX}__text-container--centered`;

export const TextContainer = ({
    centered = false,
    className = '',
    children,
    ...rest
}: TextContainerProps): JSX.Element => {
    const textContainerClassName = cx(TEXT_CONTAINER_CLASS, className, {
        [TEXT_CONTAINER_CENTERED_CLASS]: centered,
    });

    return (
        <div className={textContainerClassName} {...rest}>
            {children}
        </div>
    );
};
