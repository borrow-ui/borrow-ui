import { SIZES } from '../../config';

export const ICON_SIZES = [...SIZES] as const;

export type IconSizes = typeof SIZES[number];

export const ICON_MODIFIERS = ['clickable', 'spin', '90deg', '180deg', '270deg'] as const;

export type IconModifiers = typeof ICON_MODIFIERS[number];

export type IconFamilyType = 'material-icons' | 'fa' | 'fas' | 'fab';

export interface IconProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    name?: string;
    /** Adds a class with the family name */
    family?: IconFamilyType;
    /** Available modifiers: `clickable`, `spin`, `90deg`, `180deg`, `270deg` */
    modifiers?: IconModifiers | IconModifiers[];
    className?: string;
    /** Size of the icon: `smaller`, `small`, `normal`, `big`, `bigger`, `huge` */
    size?: IconSizes;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
}
