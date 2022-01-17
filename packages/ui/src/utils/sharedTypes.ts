import { HTMLAttributes, ComponentType, ElementType } from 'react';

export interface TestableDiv extends HTMLAttributes<HTMLDivElement> {
    'data-testid'?: string;
}
export interface TestableInput extends HTMLAttributes<HTMLInputElement> {
    'data-testid'?: string;
}

export type TagType = keyof JSX.IntrinsicElements | ComponentType<any> | ElementType;
