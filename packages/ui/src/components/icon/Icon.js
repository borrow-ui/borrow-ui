import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, SIZES } from '../../config';

export const ICON_DEFAULT_FAMILY = 'material-icons';

const ICON_CLASS = `${UI_PREFIX}__icon`;
/*
Sizes: `${UI_PREFIX}__icon--smaller`
Modifiers: `${UI_PREFIX}__icon--${modifier}` (see PropTypes for modifiers)
*/

export function Icon({
    name,
    family = ICON_DEFAULT_FAMILY,
    size = 'normal',
    modifiers = [],
    className = '',
    ...rest
}) {
    const sizeClass = `${ICON_CLASS}--${size}`;

    const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
    if (rest.onClick && !modifiersList.includes('clickable')) modifiersList.push('clickable');

    const modifiersClasses = modifiersList.map((m) => `${ICON_CLASS}--${m}`).join(' ');

    const iconClassName = `${ICON_CLASS} ${family} ${name} ${modifiersClasses} ${sizeClass} ${className}`;

    return <i className={iconClassName} {...rest} />;
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    /** Adds a class with the family name */
    family: PropTypes.oneOf(['material-icons', 'fa', 'fas', 'fab']),
    /** Available modifiers: `clickable`, `spin`, `90deg`, `180deg`, `270deg` */
    modifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.string,
    /** Size of the icon: `smaller`, `small`, `normal`, `big`, `bigger`, `huge` */
    size: PropTypes.oneOf(SIZES),
};
