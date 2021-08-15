import React, { useState } from 'react';

import { SidebarContext, Responsive } from '@borrow-ui/ui';

import { Header } from './Header';
import { MainSidebar } from './MainSidebar';
import { Footer } from './Footer';

const SIDEBAR_MEDIA_QUERIES = {
    small: '(max-width: 699px)',
    medium: '(min-width: 700px) and (max-width: 1199px)',
    large: '(min-width: 1200px)',
};

export function Layout({ Component, pageProps }) {
    const sidebarState = useState(SidebarContext.getDefaultState({ autoCloseLink: true }));

    return (
        <div className="borrow-ui borrow-ui-website">
            <SidebarContext.Provider value={sidebarState}>
                <Responsive queries={SIDEBAR_MEDIA_QUERIES}>
                    {(matches) => <Header isSmallScreen={matches.small} />}
                </Responsive>

                <div style={{ display: 'flex' }}>
                    <Responsive queries={SIDEBAR_MEDIA_QUERIES}>
                        {(matches) => <MainSidebar isSmallScreen={matches.small} />}
                    </Responsive>
                    <div className="website__content">
                        <div className="website__page">
                            <Component {...pageProps} />
                        </div>
                        <Footer />
                    </div>
                </div>
            </SidebarContext.Provider>
        </div>
    );
}
