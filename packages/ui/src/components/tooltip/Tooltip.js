import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { ReferenceOverlay, PLACEMENTS } from '../reference-overlay/ReferenceOverlay';

const TOOLTIP_CLASS = `${UI_PREFIX}__tooltip`;
const TOOLTIP_ARROW_CLASS = `${UI_PREFIX}__tooltip__arrow`;

export function Tooltip({
    tooltip,
    children,
    placement = 'top',
    triggerMode = 'hover',
    clickPersist = false,
    tooltipProps = {},
    tooltipArrowProps = {},
    popperProps,
    className = '',
    ...rest
}) {
    const { className: tooltipPropsClass, ...restTooltipProps } = tooltipProps;
    const { className: tooltipArrowPropsClass, ...restTooltipArrowProps } = tooltipArrowProps;

    const tooltipClass = `${TOOLTIP_CLASS} ${tooltipPropsClass}`.trim();

    const tooltipArrowClass = `${TOOLTIP_ARROW_CLASS} ${tooltipArrowPropsClass}`.trim();

    return (
        <ReferenceOverlay
            overlayContent={tooltip}
            className={className}
            triggerProps={rest}
            triggerMode={triggerMode}
            clickPersist={clickPersist}
            overlayProps={{
                className: tooltipClass,
                ...restTooltipProps,
            }}
            overlayArrowProps={{
                className: tooltipArrowClass,
                ...restTooltipArrowProps,
            }}
            placement={placement}
            popperProps={popperProps}
        >
            {children}
        </ReferenceOverlay>
    );
}

Tooltip.propTypes = {
    /** Tooltip content */
    tooltip: propTypesChildren,
    /** Trigger */
    children: propTypesChildren,
    /** Tooltip placement */
    placement: PropTypes.oneOf(PLACEMENTS),
    /** Which event will make the tooltip visible */
    triggerMode: PropTypes.oneOf(['hover', 'click']),
    /** If the `triggerMode` is `click`, make the tooltip persist
     * if a click is done outside of Trigger itself
     * (so the tooltip is hidden only when clicking the trigger) */
    clickPersist: PropTypes.bool,
    /** Props passed to the tooltip container */
    tooltipProps: PropTypes.shape({
        className: PropTypes.string,
    }),
    /** Props passed to the tooltip arrow */
    tooltipArrowProps: PropTypes.shape({
        className: PropTypes.string,
    }),
    /** Props forwarded to popper hook.
     * See [documentation](https://popper.js.org/react-popper/v2/hook/). */
    popperProps: PropTypes.object,
    className: PropTypes.string,
};
