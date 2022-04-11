import { TagType } from '../../utils/sharedTypes';

interface TabInterface extends React.ComponentPropsWithoutRef<React.ElementType> {
    label: React.ReactNode;
    content: React.ReactNode;
}

interface TabForwardProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** The list of tabs. Each list element is an object with `label` and `content` keys */
    tabs: Array<TabInterface>;
    /** Specifies which tab will be open by default (starts from 1) */
    firstOpen?: number;
    /** Applies padding to all body's sides */
    padded?: boolean;
    /** Applies padding only on body's top */
    paddedTop?: boolean;
    /** Properties to forward to TabHeader */
    tabHeaderProps?: TabForwardProps;
    /** Properties to forward to TabBody */
    tabBodyProps?: TabForwardProps;
    className?: string;
}

export interface TabHeaderProps {
    tabs: Array<TabInterface>;
    className?: string;
    /** Selected tab number (starts from 1) */
    selectedTab: number;
    /** Function called when tab is selected */
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
    /** Element to be shown after all labels */
    extraHeader?: React.ReactNode;
}

export interface TabBodyProps {
    tabs: Array<TabInterface>;
    className?: string;
    /** Selected tab number (starts from 1) */
    selectedTab: number;
    /** Applies padding to all sides */
    padded: boolean;
    /** Applies padding only on top */
    paddedTop: boolean;
}
