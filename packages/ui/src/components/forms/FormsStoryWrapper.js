import React, { useState } from 'react';
import PropTypes from 'prop-types';


import { propTypesChildren } from '../../utils/types';

export function FormsStoryWrapper({ initialState = {}, children }) {
    const [state, setState] = useState(initialState);

    return <div className="borrow-ui">
        <form onSubmit={e => e.preventDefault()}>{children({ state, setState })}</form>
    </div>;
}

FormsStoryWrapper.propTypes = {
    initialState: PropTypes.object,
    children: propTypesChildren,
};
