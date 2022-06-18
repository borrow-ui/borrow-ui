import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { Text } from './Text';
import { SubtitleProps } from './Subtitle.types';

const SUBTITLE_CLASS = `${UI_PREFIX}__text__subtitle`;

export const Subtitle = ({ className = '', children, ...props }: SubtitleProps): JSX.Element => {
    const subtitleClassName = cx(SUBTITLE_CLASS, className);

    return (
        <Text className={subtitleClassName} {...props}>
            {children}
        </Text>
    );
};
