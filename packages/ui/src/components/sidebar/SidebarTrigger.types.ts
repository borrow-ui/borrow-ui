import { SidebarStateInterface } from './Sidebar.types';

export interface SidebarTriggerProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
}

interface SidebarCustomTriggerChildrenProps {
    sidebarState: SidebarStateInterface | null;
    setSidebarState: React.Dispatch<React.SetStateAction<SidebarStateInterface>> | null;
    toggleStatus: () => void;
}

export interface SidebarCustomTriggerProps {
    children: (props: SidebarCustomTriggerChildrenProps) => JSX.Element;
}
