import { TagType } from '../../utils/sharedTypes';

export type NavbarMenuItemProps = {
    label: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    tag?: TagType;
    labelProps?: React.HTMLProps<HTMLDivElement>;
    descriptionProps?: React.HTMLProps<HTMLDivElement>;
};

export interface NavbarMenuProps extends React.ComponentPropsWithRef<React.ElementType> {
    title?: React.ReactNode;
    /** A list of entries whose props are valid `NavbarMenuItem` props. */
    entries: Array<NavbarMenuItemProps>;
    className?: string;
    /** Properties passed to `NavbarMenuTitle` component. */
    titleProps?: React.HTMLProps<HTMLDivElement>;
}

export interface NavbarMenuTitleProps extends React.ComponentPropsWithRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
}
