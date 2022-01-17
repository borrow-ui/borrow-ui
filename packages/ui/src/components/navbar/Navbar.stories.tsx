import React from 'react';

import { NavbarElementObject } from './Navbar.types';

// component created only to generate props table in Storybook
export const Element = (props: NavbarElementObject) => {
    return <span />;
};

interface BodyItemProps {
    /** The current query value */
    query?: string;
    /** Callback to reset navbar state (used to close the body) */
    resetState: () => void;
}

// component created only to generate props table in Storybook
export function BodyItem(props: BodyItemProps) {
    return <span />;
}
