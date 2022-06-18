import React from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { cx } from '../../utils/classNames';
import { NavbarBodyHeaderControlsProps } from './Navbar.types';

const NAVBAR_CONTROLS_CLASS = `${UI_PREFIX}__navbar__controls`;
const NAVBAR_CONTROLS_FLOATING_CLASS = `${UI_PREFIX}__navbar__controls--floating`;

export const NavbarBodyHeaderControls = ({
    toggleBodyOpen,
    floating,
}: NavbarBodyHeaderControlsProps): JSX.Element => {
    const controlsClassName = cx(NAVBAR_CONTROLS_CLASS, {
        [NAVBAR_CONTROLS_FLOATING_CLASS]: floating,
    });

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
};
