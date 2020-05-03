import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { NavbarControls } from './NavbarControls';

const NAVBAR_BODY_HEADER_CLASS = `${UI_PREFIX}__navbar__body__header`;
const NAVBAR_BODY_QUERY_CLASS = `${UI_PREFIX}__navbar__body__query`;
const NAVBAR_BODY_QUERY_INPUT_CLASS = `${UI_PREFIX}__navbar__body__query__input`;

export function NavbarBodyHeader({
    query,
    handleChangeQuery,
    toggleBodyOpen,
    showQueryInput = true,
    floatingControls = false,
}) {
    const queryInputRef = useRef();

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
                        onChange={handleChangeQuery}
                    />
                </div>
            )}
            <NavbarControls toggleBodyOpen={toggleBodyOpen} floating={floatingControls} />
        </div>
    );
}

NavbarBodyHeader.propTypes = {
    handleChangeQuery: PropTypes.func.isRequired,
    toggleBodyOpen: PropTypes.func.isRequired,
    query: PropTypes.string,
    showQueryInput: PropTypes.bool,
    floatingControls: PropTypes.bool,
};
