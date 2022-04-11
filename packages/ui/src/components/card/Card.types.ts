export interface CardProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Icon component to render on the side */
    icon?: React.ReactNode;
    /** Content to render instead of icon (i.e. an image) */
    sideContent?: React.ReactNode;
    /** Card title  */
    title?: React.ReactNode;
    /** Subtitle rendered below the title */
    subtitle?: React.ReactNode;
    /** The card's main content */
    description: React.ReactNode;
    /** Footer of the card, where to render controls.
     * The flex alignment is `space-between` so
     * an empty item (i.e. span) is required if you want
     * to align one single button to the right. */
    controls?: React.ReactNode;
    /** Card's extra className */
    className?: string;
    /** Apply a shadows to the class */
    shadowed?: boolean;
    /** Enhance the shadow on mouse hover */
    standingHover?: boolean;
    /** Apply a margin on left and bottom:
     * useful if you are rendering cards one beside another */
    marginBetween?: boolean;
    sideProps?: React.HTMLProps<HTMLDivElement>;
    iconContainerProps?: React.HTMLProps<HTMLDivElement>;
    mainProps?: React.HTMLProps<HTMLDivElement>;
    bodyProps?: React.HTMLProps<HTMLDivElement>;
    titleProps?: React.HTMLProps<HTMLDivElement>;
    subtitleProps?: React.HTMLProps<HTMLDivElement>;
    descriptionProps?: React.HTMLProps<HTMLDivElement>;
    controlsProps?: React.HTMLProps<HTMLDivElement>;
}
