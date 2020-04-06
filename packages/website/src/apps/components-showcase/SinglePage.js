import React from 'react';

import { Block, Page } from '@borrow-ui/ui/lib';

import { Badges } from './single-page/Badges';
import { BreadcrumbsComponent } from './single-page/BreadcrumbsComponent';
import { Buttons } from './single-page/Buttons';
import { Colors } from './single-page/Colors';
import { Sidebars } from './single-page/Sidebars';
import { Cards } from './single-page/Cards';
import { TabsComponent } from './single-page/TabsComponent';
import { Popovers } from './single-page/Popovers';
import { Tables } from './single-page/Tables';
import { Loaders } from './single-page/Loaders';
import { Modals } from './single-page/Modals';
import { Panels } from './single-page/Panels';
import { FormsComponent } from './single-page/Forms';

export function SinglePage() {
    return (
        <Page title="Single Page Components Showcase" className="color-neutral-white-bg">
            <Block className="color-white-bg" outstanding={true}>
                <FormsComponent />
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
            <Block className="color-white-bg" outstanding={true}>
                <TabsComponent />
                <Popovers />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <Tables />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <Loaders />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <Modals />
                <Panels />
            </Block>
            <Block className="color-white-bg" outstanding={true}>
                <FormsComponent />
            </Block>
        </Page>
    );
}
