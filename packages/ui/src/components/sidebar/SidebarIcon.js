import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { Icon } from '../icon/Icon';

const SIDEBAR_ICON_CLASS = `${UI_PREFIX}__sidebar__icon`;
const SIDEBAR_ICON_ACTIVE_OPEN_CLASS = `${UI_PREFIX}__sidebar__icon--active-open`;

export function SidebarIcon({ name, isActive, isOpen, ...rest }) {
    const iconActiveOpenClass = isActive && isOpen ? SIDEBAR_ICON_ACTIVE_OPEN_CLASS : '';

    return (
        <div className={SIDEBAR_ICON_CLASS} {...rest}>
            <Icon name={name} className={iconActiveOpenClass} />
        </div>
    );
}

SidebarIcon.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
};
