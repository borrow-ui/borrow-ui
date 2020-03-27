import React from 'react';

import { Block, Page } from '@borrow-ui/ui/lib';

import { Badges } from './single-page/Badges';
import { BreadcrumbsComponent } from './single-page/BreadcrumbsComponent';
import { Buttons } from './single-page/Buttons';
import { Colors } from './single-page/Colors';
import { Sidebars } from './single-page/Sidebars';
import { Cards } from './single-page/Cards';

export function SinglePage() {
    return (
        <Page title="Single Page Components Showcase" className="color-neutral-white-bg">
            <Block className="color-white-bg" outstanding={true}>
                <Colors />
                <Buttons />
                <Badges />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <BreadcrumbsComponent />
                <Sidebars />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <Cards />
            </Block>
        </Page>
    );
}
