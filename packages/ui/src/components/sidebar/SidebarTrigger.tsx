import React, { useContext } from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { Icon } from '../icon/Icon';

import { SidebarContext } from './SidebarContext';
import { SidebarCustomTriggerProps, SidebarTriggerProps } from './SidebarTrigger.types';

const SIDEBAR_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__trigger`;

export const SidebarTrigger = ({ className = '', ...rest }: SidebarTriggerProps): JSX.Element => {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);

    const onClick = () => {
        setSidebarState!((state) => ({
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
            {sidebarState!.opened ? <Icon name="close" /> : <Icon name="menu" />}
        </div>
    );
};

export const SidebarCustomTrigger = ({ children }: SidebarCustomTriggerProps): JSX.Element => {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);
    const toggleStatus = () => {
        setSidebarState!({
            ...sidebarState!,
            opened: !sidebarState!.opened,
            openedEntrySubContent: {},
        });
    };
    return <>{children({ sidebarState, setSidebarState, toggleStatus })}</>;
};
