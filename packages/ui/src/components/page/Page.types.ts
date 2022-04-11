import { TagType } from '../../utils/sharedTypes';

export interface PageProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Title passed to `PageHeader` as children */
    title?: React.ReactNode;
    /** Makes the title part of the body scroll (so it will not stick on the top when the page body is scrolled) */
    continuousScroll?: boolean;
    /** Use `PageBody` component. If `false`, will append children after `PageHeader` (if title is passed) */
    usePageBody?: boolean;
    /** Makes the content centered in big screens (> 1300px) */
    readableContent?: boolean;
    /** Class name passed to the container */
    className?: string;
    /** Additional props passed to `PageHeader` */
    pageHeaderProps?: PageHeaderProps;
    /** Additional props passed to `PageBody` */
    pageBodyProps?: PageBodyProps;
    /** See `PageHeader` props */
    headerVisibleFollowRef?: React.RefObject<HTMLDivElement>;
    /** See `PageHeader` props */
    headerVisibleFollowOffset?: number;
    children?: React.ReactNode;
}

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Page controls: will be shown on the right of the header (useful for buttons or icons) */
    controls?: React.ReactNode;
    /** React ref of the body element. It is used to determine if the body element is scrolled,
     * to apply a shadow to the `PageHeader` container */
    scrollRef?: React.RefObject<HTMLDivElement>;
    /** Center the content if the page is greater than 1300 px */
    readableContent?: boolean;
    /** React ref of a component. If passed, the `PageHeader` will be rendered only if the referenced component
     * is not visible. */
    headerVisibleFollowRef?: React.RefObject<HTMLDivElement>;
    /** Apply an offset to determine if the header should be visibile or not (higher the offset, higher the scroll offset) */
    headerVisibleFollowOffset?: number;
    /** Tag used for the title */
    titleTag?: TagType;
    /** If true, controls are hidden on small screens and an icon is shown, which will trigger an overlay with controls */
    responsiveControls?: boolean;
    children: React.ReactNode;
    className?: string;
}

export interface PageHeaderResponsiveControlsProps {
    controls: React.ReactNode;
    responsiveControls: boolean;
}

export interface PageBodyProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Props passed to indicate if the component is rendered after a `PageHeader` (to determine offsets) */
    withPageHeader?: boolean;
    /** Center the content if the window is greater than 1300px. */
    readableContent?: boolean;
    /** React ref assigned to `PageBody` container (to be used as `scrollRef` prop of `PageHeader`) */
    pageBodyRef?: React.RefObject<HTMLDivElement>;
    children?: React.ReactNode;
    className?: string;
}
