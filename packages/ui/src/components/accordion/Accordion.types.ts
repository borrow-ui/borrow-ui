import {
    ReactNode,
    HTMLProps,
    ComponentPropsWithoutRef,
    ElementType,
    Dispatch,
    SetStateAction,
} from 'react';

export interface IAccordionGroupState {
    open: ReactNode;
}

export type AccordionContextType = [
    IAccordionGroupState | null,
    Dispatch<SetStateAction<IAccordionGroupState>> | null
];

export interface AccordionGroupProps {
    children: ReactNode;
    initialOpenTitle: ReactNode;
}

export interface AccordionProps extends ComponentPropsWithoutRef<ElementType> {
    children: ReactNode;
    className?: string;
    /** Title of the accordion */
    title: ReactNode;
    /** Props passed to the title element */
    titleProps?: HTMLProps<HTMLDivElement>;
    /** Props passed to the content container element */
    contentProps?: HTMLProps<HTMLDivElement>;
    /** Set the initial open status of the accordion */
    initialOpen?: boolean;
    /** Specify the `maxHeight`. By default CSS adds `600px`. */
    maxHeight?: string | number;
}
