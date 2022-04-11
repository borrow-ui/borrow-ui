import React, { Fragment } from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { NavbarGroupProps } from './Navbar.types';

const NAVBAR_GROUP_CLASS = `${UI_PREFIX}__navbar__group`;
const NAVBAR_GROUP_ITEM_CLASS = `${UI_PREFIX}__navbar__group__item`;
const NAVBAR_GROUP_ITEM_CLICKABLE_CLASS = `${UI_PREFIX}__navbar__group__item--clickable`;

export const NavbarGroup = ({
    position,
    elements,
    toggleSetItem,
}: NavbarGroupProps): JSX.Element => {
    const positionClass = `${NAVBAR_GROUP_CLASS}--${position}`;

    const items = Array.isArray(elements) ? elements : [elements];

    return (
        <div className={`${NAVBAR_GROUP_CLASS} ${positionClass}`}>
            {items.map((item, index) => {
                if (!item) return null;

                const itemHeader =
                    typeof item === 'object' && 'headerLabel' in item ? item.headerLabel : null;
                return (
                    <Fragment key={`navbar-header-group-${position}-${index}`}>
                        {typeof item === 'string' && (
                            <div className={NAVBAR_GROUP_ITEM_CLASS}>{item}</div>
                        )}
                        {itemHeader && (
                            <div
                                className={`${NAVBAR_GROUP_ITEM_CLASS} ${NAVBAR_GROUP_ITEM_CLICKABLE_CLASS}`}
                                {...a11yClickableElement({
                                    onClick: () => toggleSetItem(item, true),
                                })}
                            >
                                {itemHeader}
                            </div>
                        )}
                        {React.isValidElement(item) && !item.hasOwnProperty('renderHeader') && item}
                    </Fragment>
                );
            })}
        </div>
    );
};
