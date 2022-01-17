import { TagType } from '../../utils/sharedTypes';

type SetVisibleType = React.Dispatch<React.SetStateAction<boolean>>;

type GetPanelContentPropsInput = { setVisible: SetVisibleType };

type OnOpenInput = { resolve: (value: unknown) => void; reject: (reason?: any) => void };

interface PanelConfigurationInterface {
    /** Main content to be shown in the panel */
    content?: React.ReactNode;
    /** Title of the panel */
    title?: React.ReactNode;
    /** Items to be shown in the header (like in `PageHeader` component) */
    controls?: React.ReactNode;
    /** Footer of the panel. A `flex` display is used with `space-between`,
     * so if you need to add elements only on the right you need to pass also
     * an empty item for the left. */
    footer?: React.ReactNode;
    /** hooks called when the panel:
     *
     *  - opens: `onOpen`, this must be a promise.
     */
    hooks?: {
        onOpen?: (arg0: OnOpenInput) => Promise<void> | void;
    };
    /** Width of the panel. */
    width?: number | string;
    /** Width of the content. If you specify `width` as percentage, you need to specify  */
    innerContainerWidth?: number;
    /** Add a wrapper */
    showWrapper?: boolean;
    /** Props to be passed to modal's container, inside wrapper element */
    containerProps?: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's content, inside wrapper element */
    contentProps?: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's footer, inside wrapper element */
    footerProps?: React.HTMLProps<HTMLDivElement>;
}

export interface PanelContentProps extends PanelConfigurationInterface {
    /** Set the panel visible */
    visible?: boolean;
    /** setVisible callback, passed by `Panel` component */
    setVisible: (isVisible: boolean) => void;
}

export interface PanelProps {
    Trigger: TagType;
    getPanelContentProps: (arg0: GetPanelContentPropsInput) => PanelConfigurationInterface;
}
