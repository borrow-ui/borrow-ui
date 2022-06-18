import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { Icon } from '../icon/Icon';
import { SidebarIconProps } from './SidebarIcon.types';

const SIDEBAR_ICON_CLASS = `${UI_PREFIX}__sidebar__icon`;
const SIDEBAR_ICON_ACTIVE_OPEN_CLASS = `${UI_PREFIX}__sidebar__icon--active-open`;

export const SidebarIcon = ({
    name,
    isActive,
    isOpen,
    className = '',
    ...rest
}: SidebarIconProps): JSX.Element => {
    const iconClass = cx({ [SIDEBAR_ICON_ACTIVE_OPEN_CLASS]: isActive && isOpen }, className);

    return (
        <div className={SIDEBAR_ICON_CLASS} {...rest}>
            <Icon name={name} className={iconClass} />
        </div>
    );
};
