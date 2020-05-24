import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { NavbarBodyHeader } from './NavbarBodyHeader';

const NAVBAR_BODY_CLASS = `${UI_PREFIX}__navbar__body`;
const NAVBAR_BODY_FLOATING_CONTROLS_CLASS = `${UI_PREFIX}__navbar__body--floating-controls`;
const NAVBAR_BODY_ITEM_CLASS = `${UI_PREFIX}__navbar__body__item`;

export function NavbarBody({
    selectedItem,
    SelectedItemBody,
    query,
    toggleBodyOpen,
    setState,
    resetState,
}) {
    const floatingControlsClass = selectedItem.floatingControls
        ? NAVBAR_BODY_FLOATING_CONTROLS_CLASS
        : '';
    const navbarBodyClassName = `${NAVBAR_BODY_CLASS} ${floatingControlsClass}`;

    return (
        <div className={navbarBodyClassName}>
            <NavbarBodyHeader
                query={query}
                handleChangeQuery={queryValue => {
                    setState(state => ({ ...state, query: queryValue }));
                }}
                toggleBodyOpen={toggleBodyOpen}
                showQueryInput={selectedItem.showQueryInput}
                floatingControls={selectedItem.floatingControls}
            />
            {SelectedItemBody && (
                <div className={NAVBAR_BODY_ITEM_CLASS}>
                    <SelectedItemBody query={query} resetState={resetState} />
                </div>
            )}
        </div>
    );
}

NavbarBody.propTypes = {
    selectedItem: PropTypes.shape({
        showQueryInput: PropTypes.bool,
        floatingControls: PropTypes.bool,
    }),
    SelectedItemBody: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    query: PropTypes.string,
    toggleBodyOpen: PropTypes.func,
    setState: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
};
