import { TagType } from '../../utils/sharedTypes';

type PLACEMENT_SE = '' | '-start' | '-end';
type PLACEMENT_POS = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type ReferenceOverlayPlacementType = `${PLACEMENT_POS}${PLACEMENT_SE}`;

export type ReferenceOverlayTriggerModeType = 'hover' | 'click';

export interface ReferenceOverlayProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Content of the overlay */
    overlayContent?: React.ReactNode;
    /** Trigger content */
    children?: React.ReactNode;
    className?: string;
    /** Overlay placement.
     * See [popper documentation](https://popper.js.org/docs/v2/constructors/#options). */
    placement?: ReferenceOverlayPlacementType;
    /** Which event will make the tooltip visible */
    triggerMode?: ReferenceOverlayTriggerModeType;
    /** Props passed to the trigger container */
    triggerProps?: React.HTMLProps<any>;
    /** Tag to be used as trigger/wrapper (i.e. for thead or cells).
     * Defaults to 'div'.
     */
    triggerTag?: TagType;
    /** Props passed to the overlay container */
    overlayProps?: React.HTMLProps<HTMLDivElement> & {
        className?: string;
        style?: React.CSSProperties;
        'data-testid'?: string;
    };
    /** Props passed to the overlay arrow container */
    overlayArrowProps?: React.HTMLProps<HTMLDivElement> & {
        className?: string;
        style?: React.CSSProperties;
    };
    /** Props forwarded to popper hook.
     * See [documentation](https://popper.js.org/react-popper/v2/hook/). */
    popperProps?: any;
    portalRef?: React.RefObject<HTMLElement>;
}

export interface ReferenceOverlayContentProps {
    overlayContent?: React.ReactNode;
    triggerMode: ReferenceOverlayTriggerModeType;
    overlayProps: React.HTMLProps<HTMLDivElement> & {
        className?: string;
        style?: React.CSSProperties;
    };
    overlayArrowProps: React.HTMLProps<HTMLDivElement> & {
        className?: string;
        style?: React.CSSProperties;
    };
    portalRef?: React.RefObject<HTMLElement>;

    setPopperElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    attributes: { popper?: any };
    setArrowElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    isVisible?: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    styles: {
        [key: string]: React.CSSProperties;
    };
    update: (() => Promise<Partial<any>>) | null;
}
