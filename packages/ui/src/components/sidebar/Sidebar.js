import React, { Fragment, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { SidebarEntry, SidebarEntryPropTypes } from './SidebarEntry';
import { SidebarTrigger, SidebarTriggerPropTypes } from './SidebarTrigger';

const SIDEBAR_CLASS = `${UI_PREFIX}__sidebar`;
const SIDEBAR_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__container`;
// Status class is generated for SIDEBAR_CONTAINED_CLASS:
// open => `${UI_PREFIX}__sidebar__container--open`
// closed => `${UI_PREFIX}__sidebar__container--closed`
const SIDEBAR_CONTAINER_STICKY_CLASS = `${UI_PREFIX}__sidebar__container--sticky`;
const SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS = `${UI_PREFIX}__sidebar__container--open--shadow`;
const SIDEBAR_ELEMENTS_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__elements-container`;
const SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__elements-container--with-trigger`;

export function useSidebar({ initialStatus = 'closed' } = {}) {
    const sidebarContext = createContext([{}, null]);
    const getDefaultStatus = () => ({
        status: initialStatus,
        openedEntrySubContent: {},
    });

    const ContextualizedSidebar = (props) => {
        const contextValue = useState(getDefaultStatus());

        return (
            <sidebarContext.Provider value={contextValue}>
                <Sidebar sidebarContext={sidebarContext} {...props} />
            </sidebarContext.Provider>
        );
    };
    ContextualizedSidebar.propTypes = SidebarPropTypes;

    const ContextualizedSidebarEntry = (props) => {
        return <SidebarEntry sidebarContext={sidebarContext} {...props} />;
    };
    ContextualizedSidebarEntry.propTypes = SidebarEntryPropTypes;

    const ContextualizedSidebarTrigger = (props) => {
        return <SidebarTrigger sidebarContext={sidebarContext} {...props} />;
    };
    ContextualizedSidebarTrigger.propTypes = SidebarTriggerPropTypes;

    const CustomTrigger = ({ children }) => {
        const [contextValue, setContextValue] = useContext(sidebarContext);
        const toggleStatus = () => {
            const newStatus = contextValue.status === 'open' ? 'closed' : 'open';
            setContextValue({ ...contextValue, status: newStatus });
        };
        return <Fragment>{children({ toggleStatus })}</Fragment>;
    };
    CustomTrigger.propTypes = {
        children: propTypesChildren,
    };

    return {
        sidebarContext,
        getDefaultStatus,
        SidebarEntry: ContextualizedSidebarEntry,
        Sidebar: ContextualizedSidebar,
        SidebarTrigger: ContextualizedSidebarTrigger,
        CustomTrigger,
    };
}

export function Sidebar({
    initialStatus = 'closed',
    hideTrigger = false,
    height,
    closedWidth,
    stickyTop,
    shadowWhenOpen = true,
    sidebarContext,
    className = '',
    style = {},
    children,
    ...rest
}) {
    const state = useContext(sidebarContext)[0];

    const statusClass = `${SIDEBAR_CONTAINER_CLASS}--${state.status}`;
    const stickyClass = stickyTop !== undefined ? `${SIDEBAR_CONTAINER_STICKY_CLASS}` : '';
    const openShadowClass =
        shadowWhenOpen && state.status === 'open' ? `${SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS}` : '';
    const sidebarContainerClass = `${SIDEBAR_CONTAINER_CLASS} ${statusClass} ${stickyClass} ${openShadowClass} ${className}`.trim();
    const elementsContainerTriggerClass = !hideTrigger
        ? SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS
        : '';
    const elementsContainerClass = `${SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`.trim();

    const width = closedWidth !== undefined && state.status === 'closed' ? closedWidth : undefined;
    const sidebarContainerStyle = { height, top: stickyTop, width, ...style };

    return (
        <aside className={sidebarContainerClass} style={sidebarContainerStyle} {...rest}>
            <div className={SIDEBAR_CLASS}>
                {!hideTrigger && <SidebarTrigger sidebarContext={sidebarContext} />}
                <div className={elementsContainerClass}>{children}</div>
            </div>
        </aside>
    );
}

export const SidebarPropTypes = {
    /** Initial status of the sidebar. */
    initialStatus: PropTypes.oneOf(['open', 'closed']),
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

Sidebar.propTypes = {
    /** It is possible to pass the `sidebarContext` if this is created outside
     * (i.e. to use a trigger inside a page header or a menu bar). */
    sidebarContext: PropTypes.object,
    ...SidebarPropTypes,
};
