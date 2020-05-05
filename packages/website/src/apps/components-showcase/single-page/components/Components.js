import React from 'react';

import { Title } from '@borrow-ui/ui';

import { Accordions } from './Accordions';
import { Buttons } from './Buttons';
import { Badges } from './Badges';
import { Cards } from './Cards';
import { Loaders } from './Loaders';
import { Modals } from './Modals';
import { Panels } from './Panels';
import { Popovers } from './Popovers';
import { TabsComponent } from './TabsComponent';

export function Components() {
    return (
        <div className="m-b-20">
            <Title anchor="components" className="color-primary">
                Components
            </Title>

            <Title tag="h2" anchor="components-accordions">
                Accordions
            </Title>
            <Accordions />

            <Title tag="h2" anchor="components-buttons">
                Buttons
            </Title>
            <Buttons />

            <Title tag="h2" anchor="components-badges">
                Badges
            </Title>
            <Badges />

            <Title tag="h2" anchor="components-cards">
                Cards
            </Title>
            <Cards />

            <Title tag="h2" anchor="components-loaders">
                Loaders
            </Title>
            <Loaders />

            <Title tag="h2" anchor="components-modals">
                Modals
            </Title>
            <Modals />

            <Title tag="h2" anchor="components-panels">
                Panels
            </Title>
            <Panels />

            <Title tag="h2" anchor="components-popovers">
                Popovers
            </Title>
            <Popovers />

            <Title tag="h2" anchor="components-tabs" className="m-b-0">
                Tabs
            </Title>
            <TabsComponent />
        </div>
    );
}
