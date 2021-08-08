import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { SidebarContext } from './SidebarContext';
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

const SidebarBodyPropTypes = {
    /** Hide the trigger to open/close the sidebar. */
    hideTrigger: PropTypes.bool,
    /** Make the sidebar sticky to the top. */
    stickyTop: PropTypes.bool,
    /** Overrides the height of the container. */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Width of the sidebar when is closed. */
    closedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Apply a shadow when the sidebar is open. */
    shadowWhenOpen: PropTypes.bool,
    /** If elements does not require sidebar's state, the content can be passed as children. */
    children: propTypesChildren,
    className: PropTypes.string,
    style: PropTypes.object,
};

export function Sidebar({ initialState, ...sidebarProps }) {
    const contextValue = useState(SidebarContext.getDefaultState(initialState));

    return (
        <SidebarContext.Provider value={contextValue}>
            <SidebarBody {...sidebarProps} />
        </SidebarContext.Provider>
    );
}

Sidebar.propTypes = {
    initialState: PropTypes.shape({
        /** Sidebar initialize as opened */
        opened: PropTypes.bool,
        /** Object to determine which entry content is opened (id -> true) */
        openedEntrySubContent: PropTypes.object,
        /** Automatically close the Sidebar if a link is clicked */
        autoCloseLink: PropTypes.bool,
    }),
    ...SidebarBodyPropTypes,
};

export function SidebarBody({
    hideTrigger = false,
    height,
    closedWidth,
    stickyTop,
    shadowWhenOpen = true,
    className = '',
    style = {},
    children,
    ...rest
}) {
    const state = useContext(SidebarContext)[0];

    const statusClass = `${SIDEBAR_CONTAINER_CLASS}--${state.opened ? 'open' : 'closed'}`;
    const stickyClass = stickyTop ? `${SIDEBAR_CONTAINER_STICKY_CLASS}` : '';
    const openShadowClass =
        shadowWhenOpen && state.opened ? `${SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS}` : '';
    const sidebarContainerClass = `${SIDEBAR_CONTAINER_CLASS} ${statusClass} ${stickyClass} ${openShadowClass} ${className}`.trim();
    const elementsContainerTriggerClass = !hideTrigger
        ? SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS
        : '';
    const elementsContainerClass = `${SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`.trim();

    const width = closedWidth !== undefined && !state.opened ? closedWidth : undefined;
    const sidebarContainerStyle = { height, top: stickyTop, width, ...style };

    return (
        <aside className={sidebarContainerClass} style={sidebarContainerStyle} {...rest}>
            <div className={SIDEBAR_CLASS}>
                {!hideTrigger && <SidebarTrigger />}
                <div className={elementsContainerClass}>{children}</div>
            </div>
        </aside>
    );
}

SidebarBody.propTypes = SidebarBodyPropTypes;
