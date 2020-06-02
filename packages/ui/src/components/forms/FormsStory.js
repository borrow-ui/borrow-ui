import React, { useState } from 'react';
import PropTypes from 'prop-types';

import 'react-day-picker/lib/style.css';

import { propTypesChildren } from '../../utils/types';

export function FormsStoryWrapper({ initialState = {}, children }) {
    const [state, setState] = useState(initialState);

    return <form onSubmit={e => e.preventDefault()}>{children({ state, setState })}</form>;
}

FormsStoryWrapper.propTypes = {
    initialState: PropTypes.object,
    children: propTypesChildren,
};
