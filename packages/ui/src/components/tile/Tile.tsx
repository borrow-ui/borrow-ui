import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { TileProps } from './Tile.types';

const TILE_CLASS = `${UI_PREFIX}__tile`;
const TILE_WITH_BACKGROUND_CLASS = `${UI_PREFIX}__tile--with-background`;
const TILE_MAIN_CLASS = `${UI_PREFIX}__tile__main`;
const TILE_DESCRIPTION_CLASS = `${UI_PREFIX}__tile__description`;

export function Tile({
    description,
    withBackground = false,
    tag: Tag = 'div',
    className = '',
    children,
    ...rest
}: TileProps) {
    const tileClass = cx(TILE_CLASS, className, { [TILE_WITH_BACKGROUND_CLASS]: withBackground });

    return (
        <Tag className={tileClass} {...rest}>
            <div className={TILE_MAIN_CLASS}>{children}</div>
            <div className={TILE_DESCRIPTION_CLASS}>{description}</div>
        </Tag>
    );
}
