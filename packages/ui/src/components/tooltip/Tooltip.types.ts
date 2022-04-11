import {
    ReferenceOverlayPlacementType,
    ReferenceOverlayTriggerModeType,
} from '../reference-overlay/ReferenceOverlay.types';

export interface TooltipProps {
    /** Tooltip content */
    tooltip: React.ReactNode;
    /** Trigger */
    children: React.ReactNode;
    /** Tooltip placement */
    placement?: ReferenceOverlayPlacementType;
    /** Which event will make the tooltip visible */
    triggerMode?: ReferenceOverlayTriggerModeType;
    /** Applies a class with min-width (150px) */
    minWidth?: boolean;
    /** Applies a class with max-width (300px) */
    maxWidth?: boolean;
    /** Props passed to the tooltip container */
    tooltipProps?: React.HTMLProps<HTMLDivElement> & {
        className?: string;
    };
    /** Props passed to the tooltip arrow */
    tooltipArrowProps?: React.HTMLProps<HTMLDivElement> & {
        className?: string;
    };
    /** Props forwarded to popper hook.
     * See [documentation](https://popper.js.org/react-popper/v2/hook/). */
    popperProps?: any;
    className?: string;
}
