import React from 'react';
import PropTypes from 'prop-types';

import Media from 'react-media';

const DEFAULT_QUERIES = {
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width: 1199px)',
    large: '(min-width: 1200px)',
};

export function Responsive({ queries, query, children }) {
    const mediaQueries = !queries && !query ? DEFAULT_QUERIES : queries;

    return (
        <Media queries={mediaQueries} query={query}>
            {children}
        </Media>
    );
}

Responsive.propTypes = {
    queries: PropTypes.object,
    query: PropTypes.string,
    children: PropTypes.func.isRequired,
};
