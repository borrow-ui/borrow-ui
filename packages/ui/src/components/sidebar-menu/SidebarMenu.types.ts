import { TagType } from '../../utils/sharedTypes';

export interface SidebarMenuProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    /** Applies a padding to the content */
    padded?: boolean;
}

export interface SidebarMenuTitleProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler;
    /** Overrides the tag used to crate the title. If no tag is passed,
     * it will be set as a `div` or as a `a` if `href` is specified */
    tag?: TagType;
    href?: string;
}

export interface SidebarMenuEntryProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    isActive?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler;
    /** Overrides the tag used to crate the title. If no tag is passed,
     * it will be set as a `div` or as a `a` if `href` is specified */
    tag?: TagType;
    href?: string;
}

export interface SidebarMenuSeparatorProps
    extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
}
