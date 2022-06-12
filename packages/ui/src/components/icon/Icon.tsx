import React from 'react';

import { UI_PREFIX } from '../../config';
import { IconProps } from './Icon.types';

export const ICON_DEFAULT_FAMILY = 'material-icons';

const ICON_CLASS = `${UI_PREFIX}__icon`;
/*
Sizes: `${UI_PREFIX}__icon--smaller`
Modifiers: `${UI_PREFIX}__icon--${modifier}` (see IconProps for modifiers)
*/

export const Icon = React.forwardRef<HTMLElement, IconProps>(
    (
        {
            name,
            family = ICON_DEFAULT_FAMILY,
            size = 'normal',
            modifiers = [],
            className = '',
            onClick,
            ...rest
        },
        ref
    ): JSX.Element => {
        const sizeClass = `${ICON_CLASS}--${size}`;

        const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
        if (onClick && !modifiersList.includes('clickable')) modifiersList.push('clickable');

        const modifiersClasses = modifiersList.map((m) => `${ICON_CLASS}--${m}`).join(' ');

        const iconClassName = `${ICON_CLASS} ${family} ${name} ${modifiersClasses} ${sizeClass} ${className}`;

        return <i className={iconClassName} onClick={onClick} ref={ref} {...rest} />;
    }
);

Icon.displayName = 'Icon';
