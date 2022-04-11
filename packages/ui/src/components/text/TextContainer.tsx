import React from 'react';

import { UI_PREFIX } from '../../config';
import { TextContainerProps } from './TextContainer.types';

const TEXT_CONTAINER_CLASS = `${UI_PREFIX}__text-container`;
const TEXT_CONTAINER_CENTERED_CLASS = `${UI_PREFIX}__text-container--centered`;

export const TextContainer = ({
    centered = false,
    className = '',
    children,
    ...rest
}: TextContainerProps): JSX.Element => {
    const centeredClass = centered ? TEXT_CONTAINER_CENTERED_CLASS : '';
    const textContainerClassName = `${TEXT_CONTAINER_CLASS} ${centeredClass} ${className}`.trim();

    return (
        <div className={textContainerClassName} {...rest}>
            {children}
        </div>
    );
};
