interface EntryMenu {
    type: 'entry';
    label: React.ReactNode;
    props?: React.HTMLAttributes<HTMLDivElement>;
}

interface EntryDivider {
    type: 'divider';
}

export type EntryMenuType = EntryMenu | EntryDivider;

export interface MenuProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    entries?: Array<EntryMenuType>;
}

export interface MenuEntryProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler;
}
