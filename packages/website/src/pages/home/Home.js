import React from 'react';

import { Page, Subtitle, Text } from '@borrow-ui/ui/lib';

import logo from './borrow-ui-color-192.png';
import './home.scss';

export function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <Page>
                <div className="borrow-ui__home__container">
                    <div className="borrow-ui__home__title__container">
                        <img src={logo} className="borrow-ui__home__logo" alt="Borrow UI logo" />
                        <h1 className="borrow-ui__home__title">Borrow UI</h1>
                    </div>
                    <Text size="big">
                        A collection of React components built with simplicity in mind.
                    </Text>
                    <Subtitle>
                        View the project on GitHub and fork to start your design system!
                    </Subtitle>
                </div>
            </Page>
        </div>
    );
}
