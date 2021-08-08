import React, { useState } from 'react';

import { SidebarContext, Responsive } from '@borrow-ui/ui';

import { Header } from './Header';
import { MainSidebar } from './MainSidebar';
import { Footer } from './Footer';

export function Layout({ Component, pageProps }) {
    const sidebarState = useState(SidebarContext.getDefaultState({ autoCloseLink: true }));

    return (
        <div className="borrow-ui borrow-ui-website">
            <SidebarContext.Provider value={sidebarState}>
                <Responsive>{(matches) => <Header isSmallScreen={matches.small} />}</Responsive>

                <div style={{ display: 'flex' }}>
                    <Responsive>
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
