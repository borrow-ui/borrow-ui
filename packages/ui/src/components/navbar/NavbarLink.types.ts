import { TagType } from '../../utils/sharedTypes';

export interface NavbarLinkProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    /** Use a different tag from `a`. */
    tag?: TagType;
}
