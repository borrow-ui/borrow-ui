export interface BadgeProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Adds a color with `color-on-<COLOR>` class */
    color?: string;
    /** Adds a background color with `color-<COLOR>-bg` class */
    backgroundColor?: string;
    /** Change the badge type */
    type?: 'rounded' | 'circular' | 'squared';
    /** Specify which tag has to be used for the badge */
    tag?: keyof JSX.IntrinsicElements | React.ComponentType;
    onClick?: React.MouseEventHandler;
    children: React.ReactNode;
    className?: string;
}
