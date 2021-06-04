import React from 'react';
import { PropTypes } from 'prop-types';

import { UI_PREFIX, config } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { Block } from '../block/Block';
import { Icon } from '../icon/Icon';
import { Text } from '../text/Text';
import { Title } from '../text/Title';
import { useHover } from '../../hooks/useHover';

const TILE_LINK_CLASS = `${UI_PREFIX}__tile-link`;
const TILE_LINK_LINK_CLASS = `${UI_PREFIX}__tile-link__link`;
const TILE_LINK_ENTRY_CLASS = `${UI_PREFIX}__tile-link__entry`;
const TILE_LINK_ENTRY_ICON_CONTAINER_CLASS = `${UI_PREFIX}__tile-link__entry__icon-container`;
// size is autogenerated as
// entrySize = `${TILE_LINK_ENTRY_CLASS}--${size}`;

export function TileLink({
    to,
    href,
    icon,
    iconFamily,
    name,
    description,
    size = 'small',
    className = '',
    iconProps = {},
    ...rest
}) {
    const [hoverRef, isHovered] = useHover();

    const LinkComponent = href ? 'a' : config.getLinkComponent();

    const tileLinkClassName = `${TILE_LINK_CLASS} ${className}`.trim();
    const entrySizeClassName = `${TILE_LINK_ENTRY_CLASS}--${size}`;
    const entryClassName = `${TILE_LINK_ENTRY_CLASS} ${entrySizeClassName}`;

    // re-scale the icon size based on tile size
    const iconSize = size === 'small' ? 'big' : 'huge';

    return (
        <div className={tileLinkClassName} {...rest}>
            <LinkComponent to={to} href={href} className={TILE_LINK_LINK_CLASS} ref={hoverRef}>
                <Block className={entryClassName} outstanding={isHovered} separated={false}>
                    <div>
                        <Block
                            className={TILE_LINK_ENTRY_ICON_CONTAINER_CLASS}
                            separated={false}
                            rounded={true}
                        >
                            <Icon
                                name={icon}
                                family={iconFamily}
                                size={iconSize}
                                className="color-primary"
                                {...iconProps}
                            />
                        </Block>

                        <Title tag="h4" className="m-t-5">
                            {name}
                        </Title>
                        <Text className="m-t-5 m-b-5 color-neutral">{description}</Text>
                    </div>
                </Block>
            </LinkComponent>
        </div>
    );
}

TileLink.propTypes = {
    /** Used to populate `to` prop of Link component. */
    to: PropTypes.string,
    /** Used to populate `href` prop of Link component. */
    href: PropTypes.string,
    /** Icon name. */
    icon: PropTypes.string.isRequired,
    /** Overrides default icon family. */
    iconFamily: PropTypes.string,
    /** Name of the Tile. */
    name: propTypesChildren,
    /** Description of the Tile. */
    description: propTypesChildren,
    /** Defines how big the Tile is. */
    size: PropTypes.oneOf(['small', 'big']),
    className: PropTypes.string,
    /** Overrides Icon props. */
    iconProps: PropTypes.object,
};
