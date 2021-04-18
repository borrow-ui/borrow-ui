import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { propTypesChildren } from '../../utils/types';
import { Icon } from '../icon/Icon';

const SIDEBAR_CLASS = `${UI_PREFIX}__sidebar`;
const SIDEBAR_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__container`;
// Status class is generated for SIDEBAR_CONTAINED_CLASS:
// open => `${UI_PREFIX}__sidebar__container--open`
// closed => `${UI_PREFIX}__sidebar__container--closed`
const SIDEBAR_CONTAINER_STICKY_CLASS = `${UI_PREFIX}__sidebar__container--sticky`;
const SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS = `${UI_PREFIX}__sidebar__container--open--shadow`;
const SIDEBAR_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__trigger`;
const SIDEBAR_ELEMENTS_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__elements-container`;
const SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__elements-container--with-trigger`;
const SIDEBAR_TOP_CLASS = `${UI_PREFIX}__sidebar__top-container`;
// Status class is generated from SIDEBAR_TOP_CLASS:
// open => `${UI_PREFIX}__sidebar__top-container--open`
// closed => `${UI_PREFIX}__sidebar__top-container--closed`
const SIDEBAR_BOTTOM_CLASS = `${UI_PREFIX}__sidebar__bottom-container`;

export function generateSidebarContextProvider({ initialStatus = 'closed' } = {}) {
    const SidebarContext = createContext([{}, () => ({})]);

    const SidebarProvider = ({ children }) => {
        const [state, setState] = useState({ status: initialStatus });

        return (
            <SidebarContext.Provider value={[state, setState]}>{children}</SidebarContext.Provider>
        );
    };

    SidebarProvider.propTypes = {
        children: propTypesChildren,
        initialStatus: PropTypes.oneOf(['open', 'closed']),
    };

    return { SidebarContext, SidebarProvider };
}

export const { SidebarContext, SidebarProvider } = generateSidebarContextProvider();

export function Sidebar({
    children,
    top,
    bottom,
    initialStatus = 'closed',
    disableTrigger = false,
    height,
    closedWidth,
    stickyTop,
    shadowWhenOpen = true,
    sidebarContext,
    className = '',
    style = {},
    ...rest
}) {
    const emptyContext = createContext([{}, () => ({})]);
    const [contextState, setContextState] = useContext(sidebarContext || emptyContext);
    const [componentState, setComponentState] = useState({ status: initialStatus });

    const [state, setState] = sidebarContext
        ? [contextState, setContextState]
        : [componentState, setComponentState];

    const statusClass = `${SIDEBAR_CONTAINER_CLASS}--${state.status}`;
    const stickyClass = stickyTop !== undefined ? `${SIDEBAR_CONTAINER_STICKY_CLASS}` : '';
    const openShadowClass =
        shadowWhenOpen && state.status === 'open' ? `${SIDEBAR_CONTAINER_OPEN_SHADOW_CLASS}` : '';
    const sidebarContainerClass = `${SIDEBAR_CONTAINER_CLASS} ${statusClass} ${stickyClass} ${openShadowClass} ${className}`;
    const elementsContainerTriggerClass = !disableTrigger
        ? SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS
        : '';
    const elementsContainerClass = `${SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`;
    const sidebarTopStatusClass = `${SIDEBAR_TOP_CLASS}--${state.status}`;

    const sidebarTopClass = `${SIDEBAR_TOP_CLASS} ${sidebarTopStatusClass}`;

    const width = closedWidth !== undefined && state.status === 'closed' ? closedWidth : undefined;
    const sidebarContainerStyle = { height, top: stickyTop, width, ...style };

    const onTriggerClick = () => {
        setState({
            ...state,
            status: state.status === 'open' ? 'closed' : 'open',
        });
    };

    return (
        <div className={sidebarContainerClass} style={sidebarContainerStyle} {...rest}>
            <div className={SIDEBAR_CLASS}>
                {!disableTrigger && (
                    <div
                        className={SIDEBAR_TRIGGER_CLASS}
                        {...a11yClickableElement({ onClick: onTriggerClick })}
                    >
                        {state.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
                    </div>
                )}
                <div className={elementsContainerClass}>
                    <div className={sidebarTopClass}>
                        {top && top(state, setState)}
                        {children}
                    </div>
                    <div className={SIDEBAR_BOTTOM_CLASS}>{bottom && bottom(state, setState)}</div>
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    /** A function used to generate the top part of the sidebar.
     * It will take two arguments (`sidebarState`, `setSidebarState`) and should return a valid node. */
    top: PropTypes.func,
    /** A function used to generate the bottom part of the sidebar.
     * It will take two arguments (`sidebarState`, `setSidebarState`) and should return a valid node. */
    bottom: PropTypes.func,
    /** Initial status of the sidebar. */
    initialStatus: PropTypes.oneOf(['open', 'closed']),
    /** Disable the generation of the trigger to open/close the sidebar. */
    disableTrigger: PropTypes.bool,
    /** Make the sidebar sticky to the top. */
    stickyTop: PropTypes.number,
    /** Overrides the height of the container. */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Width of the sidebar when is closed. */
    closedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Apply a shadow when the sidebar is open. */
    shadowWhenOpen: PropTypes.bool,
    /** If elements does not require sidebar's state, the content can be passed as children. */
    children: propTypesChildren,
    /** It is possible to pass the `sidebarContext` if this is created outside
     * (i.e. to use a trigger inside a page header or a menu bar). */
    sidebarContext: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
};

Sidebar.Provider = SidebarProvider;
