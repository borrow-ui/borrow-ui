import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const TILE_CLASS = `${UI_PREFIX}__tile`;
const TILE_WITH_BACKGROUND_CLASS = `${UI_PREFIX}__tile--with-background`;
const TILE_MAIN_CLASS = `${UI_PREFIX}__tile__main`;
const TILE_DESCRIPTION_CLASS = `${UI_PREFIX}__tile__description`;

export function Tile({ children, description, className = '', withBackground = false, ...rest }) {
    const withBackgroundClass = withBackground ? TILE_WITH_BACKGROUND_CLASS : '';
    const tileClass = `${TILE_CLASS} ${withBackgroundClass} ${className}`;

    return (
        <div className={tileClass} {...rest}>
            <div className={TILE_MAIN_CLASS}>{children}</div>
            <div className={TILE_DESCRIPTION_CLASS}>{description}</div>
        </div>
    );
}

Tile.propTypes = {
    children: propTypesChildren.isRequired,
    description: propTypesChildren.isRequired,
    className: PropTypes.string,
    withBackground: PropTypes.bool,
};
