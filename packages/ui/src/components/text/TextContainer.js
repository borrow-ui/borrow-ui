import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const TEXT_CONTAINER_CLASS = `${UI_PREFIX}__text-container`;
const TEXT_CONTAINER_CENTERED_CLASS = `${UI_PREFIX}__text-container--centered`;

export function TextContainer({ className = '', centered = false, children, ...rest }) {
    const centeredClass = centered ? TEXT_CONTAINER_CENTERED_CLASS : '';
    const textContainerClassName = `${TEXT_CONTAINER_CLASS} ${centeredClass} ${className}`;

    return (
        <div className={textContainerClassName} {...rest}>
            {children}
        </div>
    );
}

TextContainer.propTypes = {
    className: PropTypes.string,
    /** Applies an auto margin on left and right, to make the container centered on a big screen. */
    centered: PropTypes.bool,
    children: propTypesChildren,
};
