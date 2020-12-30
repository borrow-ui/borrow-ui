import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, config } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { propTypesChildren } from '../../utils/types';

import { Link } from '../link/Link';

import { SidebarIcon } from './SidebarIcon';
import { SidebarEntryLabelShortcut } from './SidebarEntryLabelShortcut';

const SIDEBAR_ENTRY_CLASS = `${UI_PREFIX}__sidebar__entry`;
const SIDEBAR_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry--active`;
const SIDEBAR_ENTRY_ACTIVE_OPEN_CLASS = `${UI_PREFIX}__sidebar__entry--active-open`;
const SIDEBAR_ENTRY_LABEL_CLASS = `${UI_PREFIX}__sidebar__entry__label`;
const SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry__label--active`;

const SIDEBAR_ENTRY_DETAILS_CLASS = `${UI_PREFIX}__sidebar__entry__details`;
const SIDEBAR_ENTRY_DETAILS_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry__details--active`;

export function SidebarEntry({
    sidebarState,
    iconName,
    shortcut,
    link = '',
    id = '',
    onClick,
    setSidebarState,
    children,
    details,
    iconProps,
    tag,
    ...rest
}) {
    // const sidebarState = useContext(SidebarContext)[0];
    const location = config.getLocation();

    if (details && (!id || !setSidebarState)) {
        throw new Error(
            'SidebarEntry: if you specify `details` prop, you need to set `id` and `setSidebarState` as well.'
        );
    }

    const Tag = tag ? tag : link ? Link : 'div';
    const isActive = isEntryActive(sidebarState, id, link, location);
    const isOpen = sidebarState.status === 'open';

    const activeClass = isActive ? SIDEBAR_ENTRY_ACTIVE_CLASS : '';
    const activeOpenClass = isActive && isOpen ? SIDEBAR_ENTRY_ACTIVE_OPEN_CLASS : '';
    const entryClass = `${SIDEBAR_ENTRY_CLASS} ${activeClass} ${activeOpenClass}`;
    const entryLabelActiveClass = isActive ? SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS : '';
    const entryLabelClass = `${SIDEBAR_ENTRY_LABEL_CLASS} ${entryLabelActiveClass}`;
    const entryDetailsStatusClass = `${SIDEBAR_ENTRY_DETAILS_CLASS}--${sidebarState.status}`;
    const entryDetailsActiveClass = isActive ? SIDEBAR_ENTRY_DETAILS_ACTIVE_CLASS : '';
    const entryDetailsClass = `${SIDEBAR_ENTRY_DETAILS_CLASS} ${entryDetailsStatusClass} ${entryDetailsActiveClass}`;

    const entryOnClick = () => {
        setSidebarState &&
            setSidebarState({ ...sidebarState, activeId: isActive ? undefined : id });
        onClick && onClick();
    };

    return (
        <Fragment>
            <Tag
                className={entryClass}
                to={link}
                id={id}
                {...a11yClickableElement({ onClick: entryOnClick })}
                {...rest}
            >
                {iconName && (
                    <SidebarIcon
                        name={iconName}
                        isActive={isActive}
                        isOpen={isOpen}
                        {...iconProps}
                    />
                )}
                {!iconName && shortcut !== undefined && (
                    <SidebarEntryLabelShortcut label={shortcut} />
                )}
                <div className={entryLabelClass}>{children}</div>
            </Tag>
            {(id || details) && (
                <div className={entryDetailsClass} id={id ? `${id}__details` : undefined}>
                    {details && details}
                </div>
            )}
        </Fragment>
    );
}

SidebarEntry.propTypes = {
    /** `Sidebar` state */
    sidebarState: PropTypes.object.isRequired,
    /** Name of the icon */
    iconName: PropTypes.string,
    /** Shortcut alternative to the icon */
    shortcut: PropTypes.string,
    /** Link associated with the entry */
    link: PropTypes.string,
    /** Elements visible only when the sidebar is open and the entry is active */
    details: propTypesChildren,
    /** Entry id, required if `details` are passed */
    id: PropTypes.string,
    /** Sidebar state setter, required if `details` are passed */
    setSidebarState: PropTypes.func,
    onClick: PropTypes.func,
    /** Additional properties passed to the icon component */
    iconProps: PropTypes.object,
    /** Tag to use for the entry */
    tag: propTypesChildren,
    children: propTypesChildren,
};

function isEntryActive(sidebarState, id, link, location) {
    if (sidebarState.activeId) return !!(id && sidebarState.activeId === id);

    const locationCheck = location
        ? location.pathname
        : typeof window !== 'undefined'
        ? window.location.pathname
        : '';

    if (link === '/' && (locationCheck === '/' || locationCheck === '')) return true;
    else if (link && link !== '/') return locationCheck.indexOf(link) === 0;
}
