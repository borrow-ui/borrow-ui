import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

const SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS = `${UI_PREFIX}__sidebar__entry__label__shortcut`;

export function SidebarEntryLabelShortcut({ label }) {
    const shortcut = label && label.length <= 2 ? label : getShortcut(label);

    return <div className={SIDEBAR_ENTRY_LABEL_SHORTCUT_CLASS}>{shortcut}</div>;
}

SidebarEntryLabelShortcut.propTypes = {
    label: PropTypes.string,
};

function getShortcut(label) {
    if (typeof label !== 'string') return label;

    const chars =
        label.indexOf(' ') >= 0
            ? label.split(' ')[0].substr(0, 1) + label.split(' ')[1].substr(0, 1)
            : label.substr(0, 2);
    return chars.toUpperCase();
}
