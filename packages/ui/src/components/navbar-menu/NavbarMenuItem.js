import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const NAVBAR_MENU_ITEM_CLASS = `${UI_PREFIX}__navbar-menu__item`;
const NAVBAR_MENU_ITEM_LABEL_CLASS = `${UI_PREFIX}__navbar-menu__item__label`;
const NAVBAR_MENU_ITEM_DESCRIPTION_CLASS = `${UI_PREFIX}__navbar-menu__item__description`;

export function NavbarMenuItem({
    tag: Tag = 'div',
    className = '',
    label,
    description,
    labelProps = {},
    descriptionProps = {},
    ...rest
}) {
    const navbarMenuItemClass = `${NAVBAR_MENU_ITEM_CLASS} ${className}`.trim();

    const { className: labelPropsClassName = '', ...restLabelPros } = labelProps;
    const labelClassName = `${NAVBAR_MENU_ITEM_LABEL_CLASS} ${labelPropsClassName}`.trim();

    const { className: descriptionPropsClassName = '', ...restDescriptionPros } = descriptionProps;
    const descriptionClassName = `${NAVBAR_MENU_ITEM_DESCRIPTION_CLASS} ${descriptionPropsClassName}`.trim();

    return (
        <Tag className={navbarMenuItemClass} {...rest}>
            <div className={labelClassName} {...restLabelPros}>
                {label}
            </div>
            <div className={descriptionClassName} {...restDescriptionPros}>
                {description}
            </div>
        </Tag>
    );
}

NavbarMenuItem.propTypes = {
    label: propTypesChildren,
    description: propTypesChildren,
    /** Properties passed to the label container */
    labelProps: PropTypes.object,
    /** Properties passed to the description container */
    descriptionProps: PropTypes.object,
    /** Customize the container tag */
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
};
