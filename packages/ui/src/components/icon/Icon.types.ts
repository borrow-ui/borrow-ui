import {
    MouseEventHandler,
    KeyboardEventHandler,
    ComponentPropsWithoutRef,
    ElementType,
} from 'react';

import { SIZES } from '../../config';

export const ICON_SIZES = [...SIZES] as const;

export type IconSizes = typeof SIZES[number];

export const ICON_MODIFIERS = ['clickable', 'spin', '90deg', '180deg', '270deg'] as const;

export type IconModifiers = typeof ICON_MODIFIERS[number];

export interface IconProps extends ComponentPropsWithoutRef<ElementType> {
    name?: string;
    /** Adds a class with the family name */
    family?: 'material-icons' | 'fa' | 'fas' | 'fab';
    /** Available modifiers: `clickable`, `spin`, `90deg`, `180deg`, `270deg` */
    modifiers?: IconModifiers | IconModifiers[];
    className?: string;
    /** Size of the icon: `smaller`, `small`, `normal`, `big`, `bigger`, `huge` */
    size?: IconSizes;
    onClick?: MouseEventHandler;
    onKeyDown?: KeyboardEventHandler;
}
