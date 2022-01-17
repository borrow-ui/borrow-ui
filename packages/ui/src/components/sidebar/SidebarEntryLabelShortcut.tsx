import React from 'react';

import { UI_PREFIX } from '../../config';
import { SidebarEntryLabelShortcutProps } from './SidebarEntryLabelShortcut.types';

const SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS = `${UI_PREFIX}__sidebar__entry__label__shortcut`;

export function SidebarEntryLabelShortcut({ label }: SidebarEntryLabelShortcutProps) {
    const shortcut = label && label.length <= 2 ? label : getShortcut(label);

    return <div className={SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS}>{shortcut}</div>;
}

export function getShortcut(label: string): string {
    if (typeof label !== 'string') return label;

    const chars =
        label.indexOf(' ') >= 0
            ? label.split(' ')[0].substr(0, 1) + label.split(' ')[1].substr(0, 1)
            : label.substr(0, 2);
    return chars.toUpperCase();
}
