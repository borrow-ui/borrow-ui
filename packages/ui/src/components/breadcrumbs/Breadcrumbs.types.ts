import { TagType } from '../../utils/sharedTypes';

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    link?: string;
    isLast?: boolean;
    onClick?: React.MouseEventHandler;
    /** Use a different tag from `div`. */
    tag?: TagType;
}

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;

    /** A list of objects. Each object must have a `label` and optionally
     * a link. `className` will be added to the generated one.
     */
    breadcrumbs?: Array<BreadcrumbProps>;
}
