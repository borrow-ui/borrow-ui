import React from 'react';

import { Page } from '@borrow-ui/ui/lib';

import { Badges } from './single-page/Badges';
import { BreadcrumbsComponent } from './single-page/BreadcrumbsComponent';
import { Buttons } from './single-page/Buttons';
import { Colors } from './single-page/Colors';
import { Sidebars } from './single-page/Sidebars';

export function SinglePage() {
    return (
        <Page title="Single Page Components Showcase">
            <Colors />
            <Buttons />
            <Badges />
            <BreadcrumbsComponent />
            <Sidebars />
        </Page>
    );
}
