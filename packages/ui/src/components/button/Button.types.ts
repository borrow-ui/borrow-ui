import { SIZES } from '../../config';
import { TagType } from '../../utils/sharedTypes';

import { IconProps } from '../icon/Icon.types';

type MEANS_NORMAL =
    | 'primary'
    | 'secondary'
    | 'positive'
    | 'negative'
    | 'warning'
    | 'accent'
    | 'neutral'
    | 'neutral-dark';
type MEANS_REVERSE = `${MEANS_NORMAL}-reverse`;

type ButtonMeans = MEANS_NORMAL | MEANS_REVERSE;

export const BUTTON_MODIFIERS = ['shadowed', 'separated', 'icon', ...SIZES] as const;

export type ButtonModifiers = typeof BUTTON_MODIFIERS[number];

export interface ButtonProps extends React.ComponentPropsWithoutRef<React.ElementType> {
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
    tag?: TagType;
    children?: React.ReactNode;
}
