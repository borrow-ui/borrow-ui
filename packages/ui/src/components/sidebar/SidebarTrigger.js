import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { Icon } from '../icon/Icon';

import { SidebarContext } from './SidebarContext';
import { propTypesChildren } from '../../utils/types';

const SIDEBAR_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__trigger`;

export function SidebarTrigger({ className = '', ...rest }) {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);

    const onClick = () => {
        setSidebarState((state) => ({
            ...state,
            opened: !state.opened,
            openedEntrySubContent: {},
        }));
    };

    const triggerClassName = `${SIDEBAR_TRIGGER_CLASS} ${className}`.trim();

    return (
        <div
            className={triggerClassName}
            {...a11yClickableElement({ onClick })}
            {...rest}
            data-testid="sidebar-trigger"
        >
            {sidebarState.opened ? <Icon name="close" /> : <Icon name="menu" />}
        </div>
    );
}

export const SidebarTriggerPropTypes = {
    className: PropTypes.string,
};

SidebarTrigger.propTypes = {
    ...SidebarTriggerPropTypes,
};

export function SidebarCustomTrigger({ children }) {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);
    const toggleStatus = () => {
        setSidebarState({
            ...sidebarState,
            opened: !sidebarState.opened,
            openedEntrySubContent: {},
        });
    };
    return <>{children({ sidebarState, setSidebarState, toggleStatus })}</>;
}

SidebarCustomTrigger.propTypes = {
    children: propTypesChildren,
};
