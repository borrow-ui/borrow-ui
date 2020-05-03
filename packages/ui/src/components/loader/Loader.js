import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

const LOADER_CLASS = `${UI_PREFIX}__loader`;
const LOADER_FULL_SECTION_CLASS = `${UI_PREFIX}__loader--full-section`;
const LOADER_INLINE_CLASS = `${UI_PREFIX}__loader--inline`;
const LOADER_CONTAINER_CLASS = `${UI_PREFIX}__loader__container`;
const LOADER_CONTAINER_FULL_SECTION_CLASS = `${UI_PREFIX}__loader__container--full-section`;
const LOADER_CONTAINER_INLINE_CLASS = `${UI_PREFIX}__loader__container--inline`;

export function Loader({ type = 'full-section', className = '' }) {
    const typeClassName = type === 'inline' ? LOADER_INLINE_CLASS : LOADER_FULL_SECTION_CLASS;
    const loaderClassName = `${LOADER_CLASS} ${typeClassName}`;

    const typeContainerClassName =
        type === 'inline' ? LOADER_CONTAINER_INLINE_CLASS : LOADER_CONTAINER_FULL_SECTION_CLASS;
    const loaderContainerClassName = `${LOADER_CONTAINER_CLASS} ${typeContainerClassName} ${className}`;

    return (
        <div className={loaderContainerClassName}>
            <div className={loaderClassName} />
        </div>
    );
}

Loader.propTypes = {
    type: PropTypes.oneOf(['full-section', 'inline']),
    className: PropTypes.string,
};
