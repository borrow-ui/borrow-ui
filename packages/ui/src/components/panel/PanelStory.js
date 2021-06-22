/**
 * NOTE: there is a bug in storybook which prevents the prop types
 * to be generated from ArgsTable.
 * It's probably due to the PanelContent component which does not
 * return JSX.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { propTypesChildren } from '../../utils/types';

export function PanelContentProps() {
    return <span>This is just for ArgsTable</span>;
}

PanelContentProps.propTypes = {
    /** Main content to be shown in the panel */
    content: propTypesChildren,
    /** Title of the panel */
    title: propTypesChildren,
    /** Items to be shown in the header (like in `PageHeader` component) */
    controls: propTypesChildren,
    /** Footer of the panel. A `flex` display is used with `space-between`,
     * so if you need to add elements only on the right you need to pass also
     * an empty item for the left. */
    footer: propTypesChildren,
    /** Set the panel visible */
    visible: PropTypes.bool,
    /** hooks called when the panel:
     * - opens: `onOpen`, this must be a promise.
     */
    hooks: PropTypes.object,
    /** Width of the panel. */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Width of the content. If you specify `width` as percentage, you need to specify  */
    innerContainerWidth: PropTypes.number,
    /** setVisible callback, passed by `Panel` component */
    setVisible: PropTypes.func.isRequired,
    /** Props to be passed to modal's container, inside wrapper element */
    containerProps: PropTypes.object,
    /** Props to be passed to modal's content, inside wrapper element */
    contentProps: PropTypes.object,
    /** Props to be passed to modal's footer, inside wrapper element */
    footerProps: PropTypes.object,
};
