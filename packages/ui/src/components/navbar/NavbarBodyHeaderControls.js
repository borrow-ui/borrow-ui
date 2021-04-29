import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';

const NAVBAR_CONTROLS_CLASS = `${UI_PREFIX}__navbar__controls`;
const NAVBAR_CONTROLS_FLOATING_CLASS = `${UI_PREFIX}__navbar__controls--floating`;

export function NavbarBodyHeaderControls({ toggleBodyOpen, floating }) {
    const floatingClass = floating ? NAVBAR_CONTROLS_FLOATING_CLASS : '';
    const controlsClassName = `${NAVBAR_CONTROLS_CLASS} ${floatingClass}`.trim();

    return (
        <div className={controlsClassName} data-testid="navbar-controls">
            <span
                {...a11yClickableElement({ onClick: () => toggleBodyOpen(false) })}
                style={{ cursor: 'pointer', fontSize: '24px' }}
                data-testid="navbar-controls-close"
            >
                &times;
            </span>
        </div>
    );
}

NavbarBodyHeaderControls.propTypes = {
    toggleBodyOpen: PropTypes.func.isRequired,
    floating: PropTypes.bool,
};
