import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { Text } from './Text';

const SUBTITLE_CLASS = `${UI_PREFIX}__text__subtitle`;

export function Subtitle({ className, children, ...props }) {
    const subtitleClassName = `${SUBTITLE_CLASS} ${className || ''}`;

    return (
        <Text className={subtitleClassName} {...props}>
            {children}
        </Text>
    );
}

Subtitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
