import { ReactNode, HTMLProps, ComponentPropsWithRef, ElementType } from 'react';

export interface BlockProps extends ComponentPropsWithRef<ElementType> {
    children: ReactNode;
    className?: string;
    /** Set a title for the block with h2 tag */
    title: ReactNode;
    /** Props passed to the title element */
    titleProps?: HTMLProps<HTMLDivElement>;
    /** Adds a margin to the block */
    separated: boolean;
    /** Adds padding to the block */
    padded: boolean;
    /** Makes the border rounded */
    rounded: boolean;
    /** Adds a shadow to make block outstanding */
    outstanding: boolean;
    /** Adds a shadow to make block outstanding when mouse is hovered */
    outstandingHover: boolean;
    /** Centers the content */
    contentCentered: boolean;
    /** Set the `ref` prop of the container */
}
