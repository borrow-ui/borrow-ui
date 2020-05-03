import React from 'react';

import { UI_PREFIX } from '../../config';

const MENU_DIVIDER_CLASS = `${UI_PREFIX}__menu__divider`;

export function MenuDivider() {
    return <div className={MENU_DIVIDER_CLASS} />;
}
