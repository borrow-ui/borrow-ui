import React from 'react';
import Media from 'react-media';
import { ResponsiveProps } from './Responsive.types';

export const DEFAULT_QUERIES = {
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width: 1199px)',
    large: '(min-width: 1200px)',
};

export function Responsive({ queries, query, children }: ResponsiveProps) {
    const mediaQueries = !queries && !query ? DEFAULT_QUERIES : queries;

    if (query) return <Media query={query}>{children}</Media>;

    return <Media queries={mediaQueries}>{children}</Media>;
}
