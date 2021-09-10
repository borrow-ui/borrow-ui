/**
 * Initialize the dashboard store.
 */

import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { initializeBookStore } from 'apps/books/store';

export const storeContext = createContext();

export function StoreProvider({ children }) {
    const [store, setStore] = useState({
        applicationLoaded: false,
        user: {
            id: 1,
            username: 'username',
            first_name: 'User',
            last_name: 'Surname',
        },
    });

    return <storeContext.Provider value={{ store, setStore }}>{children}</storeContext.Provider>;
}

StoreProvider.propTypes = {
    children: PropTypes.node,
};

export async function initializeStore(store, setStore) {
    return Promise.all([initializeBookStore(store, setStore)]);
}
