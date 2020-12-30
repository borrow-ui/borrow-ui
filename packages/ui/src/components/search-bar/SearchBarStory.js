import React, { useState } from 'react';
import PropTypes from 'prop-types';

import 'react-day-picker/lib/style.css';

import { propTypesChildren } from '../../utils/types';

export function SearchBarStoryWrapper({ entries, children }) {
    const [filteredEntries, setFilteredEntries] = useState(entries);
    const [globalSearch, setGlobalSearch] = useState(null);

    return (
        <>
            {children({ entries, setFilteredEntries, globalSearch, setGlobalSearch })}
            <div>
                <h3>Story filtered entries:</h3>
                <ul>
                    {filteredEntries.map((entry) => (
                        <li key={entry.id}>
                            {Object.keys(entry)
                                .map((key) => `${key}: ${entry[key]}`)
                                .join(', ')}
                            : {}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

SearchBarStoryWrapper.propTypes = {
    entries: PropTypes.array,
    children: propTypesChildren,
};
