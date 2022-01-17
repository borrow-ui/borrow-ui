export interface SidebarIconProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    name: string;
    className?: string;
    isActive?: boolean;
    isOpen?: boolean;
}
