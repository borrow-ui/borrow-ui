import React from 'react';

import { UI_PREFIX } from '../../config';
import { NavbarBodyHeader } from './NavbarBodyHeader';
import { NavbarBodyProps, NavbarItemType } from './Navbar.types';
import { NavbarStateType } from './Navbar.types';

const NAVBAR_BODY_CLASS = `${UI_PREFIX}__navbar__body`;
const NAVBAR_BODY_ITEM_CLASS = `${UI_PREFIX}__navbar__body__item`;

export const NavbarBody = ({
    selectedItem,
    SelectedItemBody,
    query,
    toggleBodyOpen,
    setState,
    resetState,
}: NavbarBodyProps): JSX.Element => {
    const selectedItemProps = getSelectedItemProps(selectedItem);

    return (
        <div className={NAVBAR_BODY_CLASS}>
            <NavbarBodyHeader
                query={query}
                handleChangeQuery={(queryValue: string) => {
                    setState((state: NavbarStateType) => ({ ...state, query: queryValue }));
                }}
                toggleBodyOpen={toggleBodyOpen}
                showQueryInput={selectedItemProps.showQueryInput}
                floatingControls={selectedItemProps.floatingControls}
                hideControls={selectedItemProps.hideControls}
            />
            {SelectedItemBody && (
                <div className={NAVBAR_BODY_ITEM_CLASS}>
                    <SelectedItemBody query={query} resetState={resetState} />
                </div>
            )}
        </div>
    );
};

function getSelectedItemProps(selectedItem: React.ReactNode | NavbarItemType): NavbarItemType {
    const props = {
        showQueryInput: false,
        floatingControls: false,
        hideControls: false,
    } as NavbarItemType;

    if (selectedItem && typeof selectedItem === 'object') {
        props.showQueryInput =
            'showQueryInput' in selectedItem ? selectedItem.showQueryInput : props.showQueryInput;
        props.floatingControls =
            'floatingControls' in selectedItem
                ? selectedItem.floatingControls
                : props.floatingControls;
        props.hideControls =
            'hideControls' in selectedItem ? selectedItem.hideControls : props.hideControls;
    }
    return props;
}
