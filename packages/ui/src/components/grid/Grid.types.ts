export interface RowProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
}

export interface ColProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    /** Set the size for the sm column. This is a shortcut to configure `col-xs-12 col-sm-*`. */
    size?: number;
    /** Overrides the default `col-xs-12 col-sm-<size>` value. */
    colClassName?: string;
}
