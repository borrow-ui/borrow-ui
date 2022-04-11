export type LoaderType = 'triangle' | 'line' | 'inline';

export interface LoaderProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
    type?: LoaderType;
}
