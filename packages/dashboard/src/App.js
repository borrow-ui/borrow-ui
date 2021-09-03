import { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

import { SidebarContext, setConfig } from '@borrow-ui/ui';

import { Header } from './components/layout/Header';
import { MainSidebar } from './components/layout/MainSidebar';

import { storeContext, StoreProvider, initializeStore } from './store';
import { Routes } from './Routes';

/**
 * Set react-router-dom default hook and component as default
 * for borrow-ui components.
 */
setConfig('getLocation', useLocation);
setConfig('getLinkComponent', () => Link);

function App() {
    /**
     * Ideally, also a store provider (i.e. Redux) can be placed here,
     * to wrap the entire application with the main store.
     *
     * For the purpose of this dashboard, we will use a dummy store based on
     * React's Context API. We will be able to consume a store/setStore pair
     * when using the store context in the forms, list and detail pages.
     * Store value can be taken from the store context:
     *
     * const { store } = useContext(storeContext);
     *
     */

    return (
        <div className="borrow-ui">
            <StoreProvider>
                <DashboardApp />
            </StoreProvider>
        </div>
    );
}

function DashboardApp() {
    const { store, setStore } = useContext(storeContext);

    useEffect(() => {
        if (!store.applicationLoaded && !store.initializing) {
            setStore((s) => ({ ...s, initializing: true }));
            initializeStore(store, setStore)
                .then(() => {
                    setStore((s) => ({ ...s, applicationLoaded: true, initializing: false }));
                })
                .catch(console.error);
        }
    }, [store, setStore]);

    /**
     * Create a Sidebar context state, and pass to the context provider.
     * This will set a provider for the main sidebar and will allow
     * the trigger on the Header to open/collapse the main sidebar.
     */
    const sidebarState = useState(SidebarContext.getDefaultState());

    /**
     * A router provider can also be set here.
     *
     * Why creating this component and not add everything in App?
     * A reason is to have distinction below between logged user or not,
     * showing a login screen instead of header+sidebar+content.
     */

    return (
        <Router>
            <SidebarContext.Provider value={sidebarState}>
                <Header />
                <div className="flex w-100pc">
                    <MainSidebar />
                    <Routes />
                </div>
            </SidebarContext.Provider>
        </Router>
    );
}

export default App;
