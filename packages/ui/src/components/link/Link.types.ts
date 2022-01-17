import { TagType } from '../../utils/sharedTypes';

export interface LinkProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    /** Use a different tag then the one configured in main settings. */
    tag?: TagType;
    underline?: boolean;
}
