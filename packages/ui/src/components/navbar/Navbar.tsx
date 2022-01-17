import React, { useState } from 'react';

import { UI_PREFIX } from '../../config';
import { NavbarGroup } from './NavbarGroup';
import { NavbarBody } from './NavbarBody';
import { NavbarProps, NavbarStateType, SingleElementType } from './Navbar.types';

const NAVBAR_CLASS = `${UI_PREFIX}__navbar`;
const NAVBAR_STICKY_CLASS = `${UI_PREFIX}__navbar--sticky`;
const NAVBAR_FIXED_CLASS = `${UI_PREFIX}__navbar--fixed`;
const NAVBAR_HEADER_CLASS = `${UI_PREFIX}__navbar__header`;

const getInitialState = (): NavbarStateType => ({
    bodyOpen: false,
    selectedItem: null,
    query: '',
});

export const Navbar = ({
    sticky = true,
    fixed = false,
    left,
    center,
    right,
    className = '',
    ...rest
}: NavbarProps): JSX.Element => {
    const [state, setState] = useState({ ...getInitialState() });

    const resetState = () => setState(getInitialState());

    const toggleBodyOpen = (forcedStatus?: boolean) => {
        const { bodyOpen } = state;
        const newOpenStatus = forcedStatus !== undefined ? forcedStatus : !bodyOpen;
        setState({ ...state, bodyOpen: newOpenStatus });
    };

    const toggleSetItem = (item: SingleElementType, openBody?: boolean) => {
        const { selectedItem, bodyOpen } = state;
        if (selectedItem === item) {
            if (!bodyOpen) {
                if (selectedItem && typeof selectedItem === 'object' && 'bodyItem' in selectedItem)
                    setState({ ...state, bodyOpen: openBody || state.bodyOpen });
            } else {
                setState({ ...state, selectedItem: null, bodyOpen: false });
            }
        } else {
            const newState = { selectedItem: item, bodyOpen };
            if (openBody !== undefined && item && typeof item === 'object' && 'bodyItem' in item)
                newState.bodyOpen = openBody;
            setState({ ...state, ...newState });
        }
    };

    const { bodyOpen, query } = state;
    const selectedItem: SingleElementType | null = state.selectedItem;

    const SelectedItemBody =
        selectedItem && typeof selectedItem === 'object' && 'bodyItem' in selectedItem
            ? selectedItem.bodyItem
            : undefined;

    const stickyClass = sticky ? NAVBAR_STICKY_CLASS : '';
    const fixedClass = fixed ? NAVBAR_FIXED_CLASS : '';
    const navbarClass = `${NAVBAR_CLASS} ${stickyClass} ${fixedClass} ${className}`.trim();

    return (
        <header className={navbarClass} {...rest}>
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
};
