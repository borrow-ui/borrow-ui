import React, { useState } from 'react';

import { useSidebar, Responsive } from '@borrow-ui/ui';

import { Header } from './Header';
import { MainSidebar, sidebarContext } from './MainSidebar';
import { Footer } from './Footer';

export function Layout({ Component, pageProps }) {
    const { SidebarEntry, getDefaultState } = useSidebar({ context: sidebarContext });
    const sidebarState = useState(getDefaultState());

    return (
        <div className="borrow-ui borrow-ui-website">
            <sidebarContext.Provider value={sidebarState}>
                <Responsive>{(matches) => <Header isSmallScreen={matches.small} />}</Responsive>

                <div style={{ display: 'flex' }}>
                    <Responsive>
                        {(matches) =>
                            matches.small && (
                                <MainSidebar
                                    isSmallScreen={matches.small}
                                    SidebarEntry={SidebarEntry}
                                />
                            )
                        }
                    </Responsive>
                    <div className="website__content">
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </div>
            </sidebarContext.Provider>
        </div>
    );
}
