export interface TextContainerProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    /** Applies an auto margin on left and right, to make the container centered on a big screen. */
    centered?: boolean;
}
