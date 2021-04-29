import React from 'react';
import PropTypes from 'prop-types';

import { propTypesChildren } from '../../utils/types';

// component created only to generate props table in Storybook
export function Element() {
    return <span />;
}

Element.propTypes = {
    /** The label visible on the navbar */
    headerLabel: propTypesChildren,
    /** Component to render in the body. If not passed,
     * a body will not be shown on the header item click.
     * Properties passed are defined in `BodyItem` prop table.
     * */
    bodyItem: PropTypes.func,
    /** Shows an input box to handle the query text */
    showQueryInput: PropTypes.bool,
    /** Makes control container floating on the top right */
    floatingControls: PropTypes.bool,
    /** Hide controls entirely */
    hideControls: PropTypes.bool,
};

// component created only to generate props table in Storybook
export function BodyItem() {
    return <span />;
}

BodyItem.propTypes = {
    /** The current query value */
    query: PropTypes.string,
    /** Callback to reset navbar state (used to close the body) */
    resetState: PropTypes.func,
};
