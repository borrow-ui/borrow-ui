import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { NavbarMenuItemProps } from './NavbarMenu.types';

const NAVBAR_MENU_ITEM_CLASS = `${UI_PREFIX}__navbar-menu__item`;
const NAVBAR_MENU_ITEM_LABEL_CLASS = `${UI_PREFIX}__navbar-menu__item__label`;
const NAVBAR_MENU_ITEM_DESCRIPTION_CLASS = `${UI_PREFIX}__navbar-menu__item__description`;

export const NavbarMenuItem = ({
    tag: Tag = 'div',
    className = '',
    label,
    description,
    labelProps = {},
    descriptionProps = {},
    ...rest
}: NavbarMenuItemProps): JSX.Element => {
    const navbarMenuItemClass = `${NAVBAR_MENU_ITEM_CLASS} ${className}`.trim();

    const { className: labelPropsClassName = '', ...restLabelPros } = labelProps;
    const labelClassName = cx(NAVBAR_MENU_ITEM_LABEL_CLASS, labelPropsClassName);

    const { className: descriptionPropsClassName = '', ...restDescriptionPros } = descriptionProps;
    const descriptionClassName = cx(NAVBAR_MENU_ITEM_DESCRIPTION_CLASS, descriptionPropsClassName);

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
};
