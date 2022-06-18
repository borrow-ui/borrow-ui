import React, { useContext } from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { cx } from '../../utils/classNames';
import { Icon } from '../icon/Icon';
import { Link } from '../link/Link';

import { SidebarContext } from './SidebarContext';
import { SidebarIcon } from './SidebarIcon';
import { SidebarEntryLabelShortcut } from './SidebarEntryLabelShortcut';
import { SidebarEntryProps } from './SidebarEntry.types';

export const CONTENT_REQUIRES_ID =
    'SidebarEntry: if you specify `content` prop, you need to set `id` as well.';

const SIDEBAR_ENTRY_CLASS = `${UI_PREFIX}__sidebar__entry`;
const SIDEBAR_ENTRY_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry--active`;
const SIDEBAR_ENTRY_GROUP_CLASS = `${UI_PREFIX}__sidebar__entry__group`;
const SIDEBAR_ENTRY_GROUP_CLICKABLE_CLASS = `${UI_PREFIX}__sidebar__entry__group--clickable`;
const SIDEBAR_ENTRY_LABEL_CLASS = `${UI_PREFIX}__sidebar__entry__label`;
const SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS = `${UI_PREFIX}__sidebar__entry__label--active`;

const SIDEBAR_ENTRY_CONTENT_TOGGLE_CLASS = `${UI_PREFIX}__sidebar__entry__toggle`;
const SIDEBAR_ENTRY_CONTENT_CLASS = `${UI_PREFIX}__sidebar__entry__content`;
const SIDEBAR_ENTRY_CONTENT_VISIBLE_CLASS = `${UI_PREFIX}__sidebar__entry__content--visible`;

export const SidebarEntry = ({
    iconName,
    shortcut,
    id = '',
    onClick,
    children,
    content,
    iconProps,
    tag,
    isActive,
    to,
    href,
    role,
    underline,
    className = '',
    entryClickToggleContent = false,
    ...rest
}: SidebarEntryProps): JSX.Element => {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);

    if (content && !id) {
        throw new Error(CONTENT_REQUIRES_ID);
    }

    const autoCloseLink = sidebarState && sidebarState.autoCloseLink;
    const isLink = !!(to || href);
    const Tag = tag ? tag : isLink ? Link : 'div';

    const entryClassName = cx(SIDEBAR_ENTRY_CLASS, className, {
        [SIDEBAR_ENTRY_ACTIVE_CLASS]: isActive,
    });
    const entryGroupClassName = cx(SIDEBAR_ENTRY_GROUP_CLASS, {
        [SIDEBAR_ENTRY_GROUP_CLICKABLE_CLASS]:
            onClick || (entryClickToggleContent && content) || isLink,
    });
    const entryLabelClassName = cx(SIDEBAR_ENTRY_LABEL_CLASS, {
        [SIDEBAR_ENTRY_LABEL_ACTIVE_CLASS]: isActive,
    });
    const entryContentStatusClass = `${SIDEBAR_ENTRY_CONTENT_CLASS}--${
        sidebarState!.opened ? 'opened' : 'closed'
    }`;
    const entryContentVisibleClass =
        id && !!sidebarState!.openedEntrySubContent[id] ? SIDEBAR_ENTRY_CONTENT_VISIBLE_CLASS : '';
    const entryContentClassName = cx(
        SIDEBAR_ENTRY_CONTENT_CLASS,
        entryContentStatusClass,
        entryContentVisibleClass
    );

    const entryContentToggleOnClick = (e: React.MouseEvent) => {
        id &&
            content &&
            setSidebarState!((state) => {
                const { openedEntrySubContent = {} } = state;
                return {
                    ...state,
                    openedEntrySubContent: {
                        ...openedEntrySubContent,
                        [id]: !Boolean(openedEntrySubContent[id]),
                    },
                };
            });
        entryClickToggleContent && onClick && onClick(e);
    };

    const clickableEntry =
        onClick || entryClickToggleContent
            ? a11yClickableElement({
                  onClick:
                      content && entryClickToggleContent ? entryContentToggleOnClick : onClick!,
                  role: 'navigation',
              })
            : {};
    const contentExpanded = id && !!sidebarState!.openedEntrySubContent[id];

    const toggleIcon = contentExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    const clickableToggle =
        content && !entryClickToggleContent
            ? a11yClickableElement({
                  onClick: entryContentToggleOnClick,
                  role: 'navigation',
              })
            : {};

    const otherProps = {
        role,
        underline,
        ...clickableEntry,
        ...rest,
    };
    if (!role && isLink) otherProps.role = 'navigation';
    if (isLink && Tag === Link) otherProps.underline = false;

    return (
        <>
            <Tag className={entryClassName} to={to} href={href} id={id} {...otherProps}>
                <div
                    className={entryGroupClassName}
                    onClick={() =>
                        autoCloseLink &&
                        isLink &&
                        !entryClickToggleContent &&
                        setSidebarState!((s) => ({ ...s, opened: false }))
                    }
                >
                    {iconName && (
                        <SidebarIcon
                            name={iconName}
                            isActive={isActive}
                            isOpen={sidebarState!.opened}
                            {...iconProps}
                        />
                    )}
                    {!iconName && shortcut !== undefined && (
                        <SidebarEntryLabelShortcut label={shortcut} />
                    )}
                    <div className={entryLabelClassName}>{children}</div>
                    {content && (
                        <div className={SIDEBAR_ENTRY_CONTENT_TOGGLE_CLASS}>
                            <Icon name={toggleIcon} size="small" {...clickableToggle} />
                        </div>
                    )}
                </div>
            </Tag>
            {content && (
                <div className={entryContentClassName} id={`${id}__content`}>
                    {content}
                </div>
            )}
        </>
    );
};
