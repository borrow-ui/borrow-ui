import React from 'react';

import { Title } from '@borrow-ui/ui';
import { BreadcrumbsComponent } from './BreadcrumbsComponent';
import { Sidebars } from './Sidebars';
import { TabsComponent } from './TabsComponent';

export function Navigation() {
    return (
        <div className="m-b-20">
            <Title anchor="navigation">Navigation</Title>

            <Title tag="h2" anchor="navigation-breadcrumbs" className="m-b-0">
                Breadcrumbs
            </Title>
            <BreadcrumbsComponent />

            <Title tag="h2" anchor="navigation-sidebars" className="m-b-0">
                Sidebars
            </Title>
            <Sidebars />

            <Title tag="h2" anchor="navigation-tabs" className="m-b-0">
                Tabs
            </Title>
            <TabsComponent />
        </div>
    );
}
