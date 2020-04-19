import React from 'react';

import { Sidebar, Responsive } from '@borrow-ui/ui';

import { Header } from './scaffold/header/Header';
import { Routes } from './routes/Routes';
import { MainSidebar } from 'scaffold/MainSidebar';

export function Website() {
    return (
        <div className="borrow-ui borrow-ui__navbar--stycky-margin">
            <Sidebar.Provider>
                <Header />
                <div style={{ display: 'flex' }}>
                    <Responsive>
                        {matches => <MainSidebar isSmallScreen={matches.small} />}
                    </Responsive>
                    <div
                        className="website__content"
                        style={{ display: 'inline-block', flexGrow: 1 }}
                    >
                        <Routes />
                    </div>
                </div>
            </Sidebar.Provider>
        </div>
    );
}
