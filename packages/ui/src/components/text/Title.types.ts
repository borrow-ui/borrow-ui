import { TagType } from '../../utils/sharedTypes';

export interface TitleProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    /** Use a different tag than div. */
    tag?: TagType;
    underline?: boolean;
    /** If set, wraps the children with an 'a' tag and assign this value as ID. */
    anchor?: string;
    anchorClassName?: string;
}
