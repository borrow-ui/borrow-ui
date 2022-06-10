import React from 'react';
import { MediaQueryValue, QueryResults } from 'react-media';

export interface ResponsiveProps {
    /** An object with name of the query as key and media query as value */
    queries?: { [key: string]: MediaQueryValue };
    /** Just the media query: the component content will be rendered only if the query passes. */
    query?: MediaQueryValue;
    children: (matches: any) => React.ReactNode;
}
