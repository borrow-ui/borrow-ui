import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { NavbarGroup } from './NavbarGroup';
import { NavbarBody } from './NavbarBody';

const NAVBAR_CLASS = `${UI_PREFIX}__navbar`;
const NAVBAR_STICKY_CLASS = `${UI_PREFIX}__navbar--sticky`;
const NAVBAR_FIXED_CLASS = `${UI_PREFIX}__navbar--fixed`;
const NAVBAR_HEADER_CLASS = `${UI_PREFIX}__navbar__header`;

const getInitialState = () => ({
    bodyOpen: false,
    selectedItem: null,
    query: '',
});

export function Navbar({ sticky = true, fixed = false, left, center, right }) {
    const [state, setState] = useState({ ...getInitialState() });

    const resetState = () => setState(getInitialState());

    const toggleBodyOpen = (forcedStatus) => {
        const { bodyOpen } = state;
        const newOpenStatus = forcedStatus !== undefined ? forcedStatus : !bodyOpen;
        setState({ ...state, bodyOpen: newOpenStatus });
    };

    const toggleSetItem = (item, openBody) => {
        const { selectedItem, bodyOpen } = state;
        if (selectedItem === item) {
            if (!bodyOpen) {
                if (selectedItem.bodyItem) setState({ ...state, bodyOpen: openBody });
            } else {
                setState({ ...state, selectedItem: null, bodyOpen: false });
            }
        } else {
            const newState = { selectedItem: item };
            if (openBody !== undefined && item.bodyItem) newState.bodyOpen = openBody;
            setState({ ...state, ...newState });
        }
    };

    const { bodyOpen, selectedItem, query } = state;

    const SelectedItemBody =
        selectedItem && selectedItem.hasOwnProperty('bodyItem') ? selectedItem.bodyItem : null;

    const stickyClass = sticky ? NAVBAR_STICKY_CLASS : '';
    const fixedClass = fixed ? NAVBAR_FIXED_CLASS : '';
    const navbarClass = `${NAVBAR_CLASS} ${stickyClass} ${fixedClass}`.trim();

    return (
        <header className={navbarClass}>
            <div className={NAVBAR_HEADER_CLASS}>
                {left && (
                    <NavbarGroup toggleSetItem={toggleSetItem} position="left" elements={left} />
                )}
                {center && (
                    <NavbarGroup
                        toggleSetItem={toggleSetItem}
                        position="center"
                        elements={center}
                    />
                )}
                {right && (
                    <NavbarGroup toggleSetItem={toggleSetItem} position="right" elements={right} />
                )}
            </div>
            {bodyOpen && (
                <NavbarBody
                    selectedItem={selectedItem}
                    SelectedItemBody={SelectedItemBody}
                    query={query}
                    setState={setState}
                    toggleBodyOpen={toggleBodyOpen}
                    resetState={resetState}
                />
            )}
        </header>
    );
}

const elementsPropType = PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])),
]);

Navbar.propTypes = {
    /** Position with position:sticky on the top of the container */
    sticky: PropTypes.bool,
    /** Use position:fixed to move the navbar on the top of the page, ignoring container */
    fixed: PropTypes.bool,
    left: elementsPropType,
    center: elementsPropType,
    right: elementsPropType,
};
