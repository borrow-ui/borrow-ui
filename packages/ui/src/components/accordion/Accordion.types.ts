export interface IAccordionGroupState {
    open: React.ReactNode;
}

export type AccordionContextType = [
    IAccordionGroupState | null,
    React.Dispatch<React.SetStateAction<IAccordionGroupState>> | null
];

export interface AccordionGroupProps {
    children: React.ReactNode;
    initialOpenTitle: React.ReactNode;
}

export interface AccordionProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    /** Title of the accordion */
    title: React.ReactNode;
    /** Props passed to the title element */
    titleProps?: React.HTMLProps<HTMLDivElement>;
    /** Props passed to the content container element */
    contentProps?: React.HTMLProps<HTMLDivElement>;
    /** Set the initial open status of the accordion */
    initialOpen?: boolean;
    /** Specify the `maxHeight`. By default CSS adds `600px`. */
    maxHeight?: string | number;
}
