import React from 'react';

import { UI_PREFIX } from '../../config';

import { ReferenceOverlay } from '../reference-overlay/ReferenceOverlay';
import { TooltipProps } from './Tooltip.types';

const TOOLTIP_CLASS = `${UI_PREFIX}__tooltip`;
const TOOLTIP_MIN_WIDTH_CLASS = `${UI_PREFIX}__tooltip--min-width`;
const TOOLTIP_MAX_WIDTH_CLASS = `${UI_PREFIX}__tooltip--max-width`;
const TOOLTIP_ARROW_CLASS = `${UI_PREFIX}__tooltip__arrow`;

export const Tooltip = ({
    tooltip,
    children,
    placement = 'top',
    triggerMode = 'hover',
    minWidth = true,
    maxWidth = true,
    tooltipProps = {},
    tooltipArrowProps = {},
    popperProps,
    className = '',
    ...rest
}: TooltipProps): JSX.Element => {
    const { className: tooltipPropsClass = '', ...restTooltipProps } = tooltipProps;
    const { className: tooltipArrowPropsClass = '', ...restTooltipArrowProps } = tooltipArrowProps;

    const minWidthClass = minWidth ? TOOLTIP_MIN_WIDTH_CLASS : '';
    const maxWidthClass = maxWidth ? TOOLTIP_MAX_WIDTH_CLASS : '';
    const widthClasses = `${minWidthClass} ${maxWidthClass}`.trim();
    const tooltipClass = `${TOOLTIP_CLASS} ${widthClasses} ${tooltipPropsClass}`.trim();

    const tooltipArrowClass = `${TOOLTIP_ARROW_CLASS} ${tooltipArrowPropsClass}`.trim();

    return (
        <ReferenceOverlay
            overlayContent={tooltip}
            className={className}
            triggerProps={rest}
            triggerMode={triggerMode}
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
};
