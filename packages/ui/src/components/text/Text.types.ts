import { TagType } from '../../utils/sharedTypes';

export interface TextProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    size?: 'small' | 'normal' | 'big';
    /** Use a different tag than div. */
    tag?: TagType;
    underline?: boolean;
}
