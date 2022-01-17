export type NavbarElementObject = {
    headerLabel?: React.ReactNode;
    bodyItem: () => JSX.Element;
    showQueryInput?: boolean;
    floatingControls?: boolean;
    hideControls?: boolean;
};

export type SingleElementType =
    | React.ReactChild
    | React.ReactFragment
    | string
    | NavbarElementObject;

export type NavbarItemType = {
    showQueryInput: boolean;
    floatingControls: boolean;
    hideControls: boolean;
};

export interface NavbarProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
    /** Position with position:sticky on the top of the container */
    sticky?: boolean;
    /** Use position:fixed to move the navbar on the top of the page, ignoring container */
    fixed?: boolean;
    left?: SingleElementType | Array<SingleElementType>;
    center?: SingleElementType | Array<SingleElementType>;
    right?: SingleElementType | Array<SingleElementType>;
}

export type NavbarStateType = {
    bodyOpen: boolean;
    selectedItem: null | SingleElementType;
    query: string;
};

export interface NavbarBodyHeaderControlsProps {
    toggleBodyOpen: (forcedStatus?: boolean) => void;
    floating?: boolean;
}

export interface NavbarBodyHeaderProps {
    handleChangeQuery: (newQuery: string) => void;
    toggleBodyOpen: (forcedStatus?: boolean) => void;
    query?: string;
    showQueryInput?: boolean;
    floatingControls?: boolean;
    hideControls?: boolean;
}

export interface NavbarBodyProps {
    selectedItem?: React.ReactNode | NavbarItemType;
    SelectedItemBody?: React.ComponentType<any> & { query?: string };
    query?: string;
    toggleBodyOpen: (forcedStatus?: boolean) => void;
    setState: React.Dispatch<React.SetStateAction<NavbarStateType>>;
    resetState: () => void;
}

export interface NavbarGroupProps {
    position: 'left' | 'center' | 'right';
    elements: SingleElementType | Array<SingleElementType>;
    toggleSetItem: (item: SingleElementType, openBody?: boolean) => void;
}
