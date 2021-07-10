import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { propTypesChildren } from '../../utils/types';

import { Icon } from '../icon/Icon';
import { Link } from '../link/Link';

import { SidebarIcon } from './SidebarIcon';
import { SidebarEntryLabelShortcut } from './SidebarEntryLabelShortcut';

export const CONTENT_REQUIRES_ID =
    'SidebarEntry: if you specify `content` prop, you need to set `id` as well.';

const SIDEBAR_ENTRY_CLASS = `${UI_PREFIX}__sidebar__entry`;
const SIDEBAR_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry--active`;
const SIDEBAR_ENTRY_ACTIVE_OPEN_CLASS = `${UI_PREFIX}__sidebar__entry--active-open`;
const SIDEBAR_ENTRY_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar__entry--clickable`;
const SIDEBAR_ENTRY_LABEL_CLASS = `${UI_PREFIX}__sidebar__entry__label`;
const SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry__label--active`;

const SIDEBAR_ENTRY_CONTENT_TOGGLE_CLASS = `${UI_PREFIX}__sidebar__entry__toggle`;
const SIDEBAR_ENTRY_CONTENT_CLASS = `${UI_PREFIX}__sidebar__entry__content`;
const SIDEBAR_ENTRY_CONTENT_VISIBLE_CLASS = `${UI_PREFIX}__sidebar__entry__content--visible`;

export function SidebarEntry({
    sidebarContext,
    iconName,
    shortcut,
    link = '',
    id = '',
    onClick,
    children,
    content,
    iconProps,
    tag,
    isActive,
    entryClickToggleContent = false,
    ...rest
}) {
    const [sidebarState, setSidebarState] = useContext(sidebarContext);

    if (content && !id) {
        throw new Error(CONTENT_REQUIRES_ID);
    }

    const Tag = tag ? tag : link ? Link : 'div';
    const isOpen = sidebarState.status === 'open';

    const activeClass = isActive ? SIDEBAR_ENTRY_ACTIVE_CLASS : '';
    const clickableClass =
        onClick || (entryClickToggleContent && content) ? SIDEBAR_ENTRY_CLICKABLE_CLASS : '';
    const entryClass = `${SIDEBAR_ENTRY_CLASS} ${activeClass} ${clickableClass}`.trim();
    const entryLabelActiveClass = isActive ? SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS : '';
    const entryLabelClass = `${SIDEBAR_ENTRY_LABEL_CLASS} ${entryLabelActiveClass}`;
    const entryContentStatusClass = `${SIDEBAR_ENTRY_CONTENT_CLASS}--${sidebarState.status}`;
    const entryContentVisibleClass =
        id && !!sidebarState.openedEntrySubContent[id] ? SIDEBAR_ENTRY_CONTENT_VISIBLE_CLASS : '';
    const entryContentClass = `${SIDEBAR_ENTRY_CONTENT_CLASS} ${entryContentStatusClass} ${entryContentVisibleClass}`;

    const entryContentToggleOnClick = () => {
        id &&
            content &&
            setSidebarState((state) => {
                const { openedEntrySubContent } = state;
                openedEntrySubContent[id] = Boolean(!openedEntrySubContent[id]);
                return { ...state, openedEntrySubContent };
            });
        entryClickToggleContent && onClick && onClick();
    };

    const clickableEntry =
        onClick || entryClickToggleContent
            ? a11yClickableElement({
                  onClick: content && entryClickToggleContent ? entryContentToggleOnClick : onClick,
                  role: 'navigation',
              })
            : {};
    const contentExpanded = id && sidebarState.openedEntrySubContent[id];

    const toggleIcon = contentExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    const clickableToggle =
        content && !entryClickToggleContent
            ? a11yClickableElement({ onClick: entryContentToggleOnClick, role: 'navigation' })
            : {};

    const otherProps = {
        ...clickableEntry,
        ...rest,
    };
    if (!otherProps.role && link) otherProps.role = 'navigation';

    return (
        <Fragment>
            <Tag className={entryClass} to={link} id={id} {...otherProps}>
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
                {content && (
                    <div className={SIDEBAR_ENTRY_CONTENT_TOGGLE_CLASS}>
                        <Icon name={toggleIcon} size="small" {...clickableToggle} />
                    </div>
                )}
            </Tag>
            {content && (
                <div className={entryContentClass} id={`${id}__content`}>
                    {content}
                </div>
            )}
        </Fragment>
    );
}

export const SidebarEntryPropTypes = {
    /** Name of the icon */
    iconName: PropTypes.string,
    /** Shortcut alternative to the icon */
    shortcut: PropTypes.string,
    /** Link associated with the entry */
    link: PropTypes.string,
    /** Elements visible only when the sidebar is open and expanded */
    content: propTypesChildren,
    /** Entry id, required if `content` is passed */
    id: PropTypes.string,
    /** Additional properties passed to the icon component */
    iconProps: PropTypes.object,
    /** Tag to use for the entry */
    tag: propTypesChildren,
    /** Flag to apply active class */
    isActive: PropTypes.bool,
    /** Flag to determine if clicking the label will toggle the content */
    entryClickToggleContent: PropTypes.bool,
    onClick: PropTypes.func,
    children: propTypesChildren,
};

SidebarEntry.propTypes = {
    /** `Sidebar` context */
    sidebarContext: PropTypes.object.isRequired,
    ...SidebarEntryPropTypes,
};
