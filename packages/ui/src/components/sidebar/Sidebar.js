import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';
import { Icon } from '../icon/Icon';

const SIDEBAR_CLASS = `${UI_PREFIX}__sidebar`;
const SIDEBAR_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__container`;
const SIDEBAR_CONTAINER_STICKY_CLASS = `${UI_PREFIX}__sidebar__container--sticky`;
const SIDEBAR_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__trigger`;
const SIDEBAR_ELEMENTS_CONTAINER_CLASS = `${UI_PREFIX}__sidebar__elements-container`;
const SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__elements-container--with-trigger`;
const SIDEBAR_TOP_CLASS = `${UI_PREFIX}__sidebar__top-container`;
const SIDEBAR_BOTTOM_CLASS = `${UI_PREFIX}__sidebar__bottom-container`;

export const SidebarContext = createContext([{}, () => ({})]);

export const SidebarProvider = ({ children, initialStatus }) => {
    const [state, setState] = useState({ status: initialStatus });

    return <SidebarContext.Provider value={[state, setState]}>{children}</SidebarContext.Provider>;
};

SidebarProvider.propTypes = {
    children: propTypesChildren,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
};

SidebarProvider.defaultProps = {
    initialStatus: 'closed',
};

export function Sidebar({
    children,
    top,
    bottom,
    initialStatus,
    disableTrigger,
    height,
    sticky = false,
    sidebarContext,
    className = '',
    ...rest
}) {
    const emptyContext = React.createContext([{}, () => ({})]);
    const [contextState, setContextState] = useContext(sidebarContext || emptyContext);
    const [componentState, setComponentState] = useState({ status: initialStatus });

    const [state, setState] = sidebarContext
        ? [contextState, setContextState]
        : [componentState, setComponentState];

    const statusClass = `${SIDEBAR_CONTAINER_CLASS}--${state.status}`;
    const stickyClass = sticky ? `${SIDEBAR_CONTAINER_STICKY_CLASS}` : '';
    const sidebarContainerClass = `${SIDEBAR_CONTAINER_CLASS} ${statusClass} ${stickyClass} ${className}`;
    const elementsContainerTriggerClass = !disableTrigger
        ? SIDEBAR_ELEMENTS_CONTAINER_WITH_TRIGGER_CLASS
        : '';
    const elementsContainerClass = `${SIDEBAR_ELEMENTS_CONTAINER_CLASS} ${elementsContainerTriggerClass}`;
    const sidebarTopStatusClass = `${SIDEBAR_TOP_CLASS}--${state.status}`;
    const sidebarTopClass = `${SIDEBAR_TOP_CLASS} ${sidebarTopStatusClass}`;

    const style = { height };

    return (
        <div className={sidebarContainerClass} style={style} {...rest}>
            <div className={SIDEBAR_CLASS}>
                {!disableTrigger && (
                    <div
                        className={SIDEBAR_TRIGGER_CLASS}
                        onClick={() => {
                            setState({
                                ...state,
                                status: state.status === 'open' ? 'closed' : 'open',
                            });
                        }}
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
    children: propTypesChildren,
    sticky: PropTypes.bool,
    top: PropTypes.func,
    bottom: PropTypes.func,
    initialStatus: PropTypes.oneOf(['open', 'closed']),
    disableTrigger: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    sidebarContext: PropTypes.object,
};

Sidebar.defaultProps = {
    initialStatus: 'closed',
    disableTrigger: false,
};

Sidebar.Provider = SidebarProvider;
