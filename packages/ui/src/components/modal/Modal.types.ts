import { IconProps } from '../icon/Icon.types';

type SetVisibleType = React.Dispatch<React.SetStateAction<boolean>>;

type GetModalWindowPropsInput = { setVisible: SetVisibleType };

export interface ModalProps {
    /** Trigger component, will receive a `setVisible` function,
     * which arg is a boolean to set the modal status */
    Trigger: React.ElementType<any>;
    /** Function called to get the Modal props, it should return an object.
     * See `ModalWindow` props to see the valid keys for the return object. */
    getModalWindowProps: (arg0: GetModalWindowPropsInput) => {};
}

export type ModalStateType = {
    isMaximized: boolean;
    modalContainerStyle: {
        width?: string | number | undefined;
        height?: string | number | undefined;
    };
    isLoading: boolean;
};

type OnOpenInput = { resolve: (value: unknown) => void; reject: (reason?: any) => void };

export interface ModalWindowProps {
    /** Modal Title */
    title?: React.ReactNode;
    /* Modal Content, rendered as modal body */
    content?: React.ReactNode;
    /** Modal Footer, rendered after the body */
    footer?: React.ReactNode;
    /**  */
    closeModal?: () => {};
    /** setVisible callback, coming from Modal's Trigger */
    setVisible: SetVisibleType;
    /** Render a close Icon on the top right to close the modal */
    showCloseIcon?: boolean;
    /** Set the modal maximized on open */
    maximized?: boolean;
    /** If the modal can maximize to full screen, show icons to trigger the status */
    canMaximize?: boolean;
    /** Close the modal if Escape key is pressed */
    closeOnEscape?: boolean;
    /** Stop click event to be propagated outside the modal window */
    stopClickPropagation?: boolean;
    /** Initial modal height */
    startHeight?: string | number;
    /** Initial modal width */
    startWidth?: string | number;
    /** Hooks called on modal events. Valid events are: `onOpen` */
    hooks?: {
        onOpen?: (arg0: OnOpenInput) => Promise<void> | void;
    };
    /** Props to be passed to modal's top element */
    wrapperProps?: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's container, inside wrapper element */
    containerProps?: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's content, inside wrapper element */
    contentProps?: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's footer, inside wrapper element */
    footerProps?: React.HTMLProps<HTMLDivElement>;
}

export interface ModalWindowPortalInput {
    /** Modal Title */
    title?: React.ReactNode;
    /* Modal Content, rendered as modal body */
    content?: React.ReactNode;
    /** Modal Footer, rendered after the body */
    footer?: React.ReactNode;
    classes: {
        modalContainerStatusClass: string;
        modalContentSizeClass: string;
    };
    styles: {
        modalContentStyle: Object;
    };
    /** Render a close Icon on the top right to close the modal */
    showCloseIcon?: boolean;
    /** If the modal can maximize to full screen, show icons to trigger the status */
    canMaximize?: boolean;
    setIsMaximized: (isMax: boolean) => void;
    closeModalWindow?: () => void;
    /** Stop click event to be propagated outside the modal window */
    stopClickPropagation?: boolean;
    modalState: ModalStateType;
    modalContainer: Element;
    /** Props to be passed to modal's top element */
    wrapperProps: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's container, inside wrapper element */
    containerProps: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's content, inside wrapper element */
    contentProps: React.HTMLProps<HTMLDivElement>;
    /** Props to be passed to modal's footer, inside wrapper element */
    footerProps: React.HTMLProps<HTMLDivElement>;
}

export interface IconControlMaximizedProps extends IconProps {
    setIsMaximized: (isMax: boolean) => void;
}

export interface IconControlCloseWindowModalProps extends IconProps {
    closeModalWindow?: (props?: {}) => void;
}
