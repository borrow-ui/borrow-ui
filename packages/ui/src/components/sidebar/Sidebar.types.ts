export interface SidebarStateInterface {
    /** Sidebar initialize as opened */
    opened: boolean;
    /** Object to determine which entry content is opened (id -> true) */
    openedEntrySubContent: { [key: string | number]: boolean };
    /** Automatically close the Sidebar if a link is clicked */
    autoCloseLink: boolean;
}

export interface SidebarStateOverrideInterface {
    /** Sidebar initialize as opened */
    opened?: boolean;
    /** Object to determine which entry content is opened (id -> true) */
    openedEntrySubContent?: { [key: string | number]: boolean };
    /** Automatically close the Sidebar if a link is clicked */
    autoCloseLink?: boolean;
}

export interface SidebarBodyProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** If elements does not require sidebar's state, the content can be passed as children. */
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;

    /** Hide the trigger to open/close the sidebar. */
    hideTrigger?: boolean;
    /** Make the sidebar sticky to the top; expects pixel value. */
    stickyTop?: number;
    /** Overrides the height of the container. */
    height?: string | number;
    /** Width of the sidebar when is closed. */
    closedWidth?: string | number;
    /** Apply a shadow when the sidebar is open. */
    shadowWhenOpen?: boolean;
}

export interface SidebarProps extends SidebarBodyProps {
    initialState?: SidebarStateOverrideInterface;
}
