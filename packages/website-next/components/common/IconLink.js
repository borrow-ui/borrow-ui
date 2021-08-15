import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@borrow-ui/ui';

export function IconLink({ href }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="color-gray-l2 m-l-10">
            <Icon name="transit_enterexit" size="small" modifiers={['180deg']} />
        </a>
    );
}

IconLink.propTypes = {
    href: PropTypes.string.isRequired,
};
