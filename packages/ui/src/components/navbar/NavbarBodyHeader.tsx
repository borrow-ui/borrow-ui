import React, { useRef, useEffect } from 'react';

import { UI_PREFIX } from '../../config';
import { NavbarBodyHeaderControls } from './NavbarBodyHeaderControls';
import { NavbarBodyHeaderProps } from './Navbar.types';

const NAVBAR_BODY_HEADER_CLASS = `${UI_PREFIX}__navbar__body__header`;
const NAVBAR_BODY_QUERY_CLASS = `${UI_PREFIX}__navbar__body__query`;
const NAVBAR_BODY_QUERY_INPUT_CLASS = `${UI_PREFIX}__navbar__body__query__input`;

export const NavbarBodyHeader = ({
    query,
    handleChangeQuery,
    toggleBodyOpen,
    showQueryInput = false,
    floatingControls = false,
    hideControls = false,
}: NavbarBodyHeaderProps): JSX.Element => {
    const queryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            queryInputRef.current && queryInputRef.current.focus();
        }, 5);
    });

    return (
        <div className={NAVBAR_BODY_HEADER_CLASS}>
            {showQueryInput && (
                <div className={NAVBAR_BODY_QUERY_CLASS}>
                    <input
                        ref={queryInputRef}
                        type="text"
                        value={query}
                        placeholder="Type your query here..."
                        className={NAVBAR_BODY_QUERY_INPUT_CLASS}
                        onChange={(e) => handleChangeQuery(e.target.value)}
                    />
                </div>
            )}
            {!showQueryInput && <span />}
            {!hideControls && (
                <NavbarBodyHeaderControls
                    toggleBodyOpen={toggleBodyOpen}
                    floating={floatingControls}
                />
            )}
        </div>
    );
};
