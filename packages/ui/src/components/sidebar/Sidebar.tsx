import React, { useContext, useState } from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { SidebarBodyProps, SidebarProps } from './Sidebar.types';

import { SidebarContext, getSidebarContextDefaultState } from './SidebarContext';
import { SidebarTrigger } from './SidebarTrigger';

const SIDEBAR_CLASS = `${UI_PREFIX}__sidebar`;
const SIDEBAR_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__container`;
// Status class is generated for SIDEBAR_CONTAINED_CLASS:
// open => `${UI_PREFIX}__sidebar__container--open`
// closed => `${UI_PREFIX}__sidebar__container--closed`
const SIDEBAR_CONTAINER_STICKY_CLASS = `${UI_PREFIX}__sidebar__container--sticky`;
const SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS = `${UI_PREFIX}__sidebar__container--open--shadow`;
const SIDEBAR_ELEMENTS_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__elements-container`;
const SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__elements-container--with-trigger`;

export const Sidebar = ({ initialState, ...sidebarProps }: SidebarProps): JSX.Element => {
    const contextValue = useState(getSidebarContextDefaultState(initialState));

    return (
        <SidebarContext.Provider value={contextValue}>
            <SidebarBody {...sidebarProps} />
        </SidebarContext.Provider>
    );
};

export const SidebarBody = ({
    hideTrigger = false,
    height,
    closedWidth,
    stickyTop,
    shadowWhenOpen = true,
    className = '',
    style = {},
    children,
    ...rest
}: SidebarBodyProps): JSX.Element => {
    const state = useContext(SidebarContext)[0];

    const statusClass = `${SIDEBAR_CONTAINER_CLASS}--${state!.opened ? 'open' : 'closed'}`;
    const sidebarContainerClassName = cx(SIDEBAR_CONTAINER_CLASS, statusClass, className, {
        [SIDEBAR_CONTAINER_STICKY_CLASS]: stickyTop,
        [SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS]: shadowWhenOpen && state!.opened,
    });
    const elementsContainerClassName = cx(SIDEBAR_ELEMENTS_CONTAINER_CLASS, {
        [SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS]: !hideTrigger,
    });

    const width = closedWidth !== undefined && !state!.opened ? closedWidth : undefined;
    const sidebarContainerStyle = { height, top: stickyTop, width, ...style };

    return (
        <aside className={sidebarContainerClassName} style={sidebarContainerStyle} {...rest}>
            <div className={SIDEBAR_CLASS}>
                {!hideTrigger && <SidebarTrigger />}
                <div className={elementsContainerClassName}>{children}</div>
            </div>
        </aside>
    );
};
