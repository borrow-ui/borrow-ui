import React from 'react';
import PropTypes from 'prop-types';

// For font-awesome, import this on your App:
// import '@fortawesome/fontawesome-free/css/all.css';

// For material-design icons, import this on your App:
// import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { UI_PREFIX } from 'config';

// import 'style/components/icon/icon.scss';

const ICON_CLASS = `${UI_PREFIX}__icon`;
/*
Sizes: see SCSS file i.e. `${UI_PREFIX}__icon--smaller`
*/

export function Icon({ name, family = 'material-icons', size = 'normal', modifiers = [], className = '', ...rest }) {
    const sizeClass = `${ICON_CLASS}--${size}`;

    const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
    if (rest.onClick && !modifiersList.includes('clickable')) modifiersList.push('clickable');

    const modifiersClasses = modifiersList.map(m => `${ICON_CLASS}--${m}`).join(' ');

    const iconClassName = `${ICON_CLASS} ${family} ${name} ${modifiersClasses} ${sizeClass} ${className}`;

    return <i className={iconClassName} {...rest} />;
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    family: PropTypes.oneOf(['material-icons', 'fa', 'fas', 'fab']),
    modifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.string,
    size: PropTypes.oneOf(['smaller', 'small', 'normal', 'big', 'bigger', 'huge']),
};
