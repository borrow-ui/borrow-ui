import { ReactNode, ComponentType, ComponentPropsWithoutRef, ElementType } from 'react';

import { SIZES } from '../../config';

import { IconProps } from '../icon/Icon.types';

const MEANS = [
    'primary',
    'primary-reverse',
    'secondary',
    'secondary-reverse',
    'positive',
    'positive-reverse',
    'negative',
    'negative-reverse',
    'warning',
    'warning-reverse',
    'accent',
    'accent-reverse',
    'neutral',
    'neutral-reverse',
    'neutral-dark',
    'neutral-dark-reverse',
    'neutral-light',
    'neutral-light-reverse',
] as const;

type ButtonMeans = typeof MEANS[number];

export const BUTTON_MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES] as const;

export type ButtonModifiers = typeof BUTTON_MODIFIERS[number];

export interface ButtonProps extends ComponentPropsWithoutRef<ElementType> {
    className?: string;
    /** Disable the button. */
    disabled?: boolean;
    /** Defines the mean of the button. */
    mean?: ButtonMeans;
    /** Controls the size of the button. */
    size?: typeof SIZES[number];
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
