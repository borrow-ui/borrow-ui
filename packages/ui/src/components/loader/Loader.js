import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

const LOADER_CONTAINER_CLASS = `${UI_PREFIX}__loader-container`;
const LOADER_CLASS = `${UI_PREFIX}__loader`;
const LOADER_CIRCLE_CLASS = `${UI_PREFIX}__loader__circle`;
// loaderType defines the type class, calculated as
// triangle => `${LOADER_CONTAINER_CLASS}--triangle`
// triangle => `${LOADER_CLASS}--triangle`
// triangle => `${LOADER_CIRCLE_CLASS}--triangle`

export function Loader({ type: loaderType = 'triangle', className = '', ...rest }) {
    const loaderContainerClassName =
        `${LOADER_CONTAINER_CLASS} ${LOADER_CONTAINER_CLASS}--${loaderType} ${className}`.trim();
    const loaderClassName = `${LOADER_CLASS} ${LOADER_CLASS}--${loaderType}`;
    const loaderCircleClassName = `${LOADER_CIRCLE_CLASS} ${LOADER_CIRCLE_CLASS}--${loaderType}`;

    return (
        <div className={loaderContainerClassName} {...rest}>
            <div className={loaderClassName}>
                <div className={loaderCircleClassName} />
                {loaderType !== 'inline' && (
                    <>
                        <div className={loaderCircleClassName} />
                        <div className={loaderCircleClassName} />
                    </>
                )}
            </div>
        </div>
    );
}

Loader.propTypes = {
    type: PropTypes.oneOf(['triangle', 'line', 'inline']),
    className: PropTypes.string,
};
