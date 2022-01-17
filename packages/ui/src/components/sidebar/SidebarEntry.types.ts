import { TagType } from '../../utils/sharedTypes';
import { IconProps } from '../icon/Icon.types';

export interface SidebarEntryProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    /** Name of the icon */
    iconName?: string;
    /** Shortcut alternative to the icon */
    shortcut?: string;
    /** Link associated with the entry */
    link?: string;
    /** Elements visible only when the sidebar is open and expanded */
    content?: React.ReactNode;
    /** Entry id, required if `content` is passed */
    id?: string;
    /** Additional properties passed to the icon component */
    iconProps?: IconProps;
    /** Tag to use for the entry */
    tag?: TagType;
    /** Flag to apply active class */
    isActive?: boolean;
    /** Flag to determine if clicking the label will toggle the content */
    entryClickToggleContent?: boolean;
    /** Link target for react-router */
    to?: string;
    /** Link target for standard links or Next */
    href?: string;
    role?: string;
    underline?: boolean;
    onClick?: React.MouseEventHandler;
}
