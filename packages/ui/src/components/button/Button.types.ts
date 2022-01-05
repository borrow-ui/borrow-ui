import { ReactNode, ComponentType, ComponentPropsWithoutRef, ElementType } from 'react';

import { SIZES } from '../../config';

import { IconProps } from '../icon/Icon.types';

const MEANS_REGULAR = [
    'primary',
    'secondary',
    'positive',
    'negative',
    'warning',
    'accent',
    'neutral',
    'neutral-dark',
    'neutral-light',
];
const MEANS_REVERSE = MEANS_REGULAR.map((m) => `${m}-reverse`);
export const MEANS = [...MEANS_REGULAR, ...MEANS_REVERSE] as const;

export type ButtonMeans = typeof MEANS[number];

export const BUTTON_MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES] as const;

export type ButtonModifiers = typeof BUTTON_MODIFIERS[number];

export interface ButtonProps extends ComponentPropsWithoutRef<ElementType> {
    className?: string;
    /** Disable the button. */
    disabled?: boolean;
    /** Defines the mean of the button. */
    mean?: ButtonMeans;
    /** Controls the size of the button. */
    size?: 'smaller' | 'small' | 'normal' | 'big' | 'bigger' | 'huge';
    /** Removes the shadow to make the button looks flat. */
    flat?: boolean;
    /** Adds a margin. */
    separated?: boolean;
    /** Reserved prop, can override behaviour of the other flags. */
    modifiers?: ButtonModifiers[];
    /** Icon to be rendered. */
    icon?: string;
    /** Props for the icon Component. */
    iconProps?: IconProps;
    /** Use a different tag from `button`. */
    tag?: keyof JSX.IntrinsicElements | ComponentType;
    children?: ReactNode;
}
