import React from 'react';

import {
    Accordion,
    Block,
    Icon,
    Page,
    Responsive,
    TextContainer,
    Sidebar,
    SidebarMenu,
    useAnchor,
} from '@borrow-ui/ui/lib';

import { Typography } from './single-page/typography/Typography';
import { Navigation } from './single-page/navigation/Navigation';
import { Components } from './single-page/components/Components';
import { DataVisualization } from './single-page/data-visualization/DataVisualization';
import { FormsComponent } from './single-page/forms/Forms';

import './single-page/single-page.scss';

export function SinglePage() {
    useAnchor();

    return (
        <Page
            title="Single Page Components Showcase"
            className="color-neutral-white-bg single-page__page"
        >
            <Responsive queries={{ minSize: '(max-width: 864px)' }}>
                {matches => {
                    if (!matches.minSize)
                        return (
                            <Sidebar
                                disableTrigger={true}
                                initialStatus={'open'}
                                top={() => SidebarMenuNavigator()}
                                stickyTop={0}
                                shadowWhenOpen={false}
                                style={{ width: 250 }}
                            />
                        );
                    else
                        return (
                            <Accordion
                                title={
                                    <div className="flex-start-center line-height-font-size">
                                        <Icon name="menu" className="m-r-5" />
                                        Browse elements
                                    </div>
                                }
                                maxHeight={2000}
                            >
                                {SidebarMenuNavigator()}
                            </Accordion>
                        );
                }}
            </Responsive>
            <TextContainer>
                <Block className="color-white-bg" outstanding={true}>
                    <Typography />
                </Block>
                <Block className="color-white-bg" outstanding={true}>
                    <Navigation />
                </Block>
                <Block className="color-white-bg" outstanding={true}>
                    <Components />
                </Block>
                <Block className="color-white-bg" outstanding={true}>
                    <DataVisualization />
                </Block>
                <Block className="color-white-bg" outstanding={true}>
                    <FormsComponent />
                </Block>
            </TextContainer>
        </Page>
    );
}

function SidebarMenuNavigator() {
    const { Title, Entry } = SidebarMenu;
    return (
        <SidebarMenu isPadded={true}>
            <Title href="#typography">Typography</Title>
            <Entry href="#typography-titles">Titles</Entry>
            <Entry href="#typography-text">Text</Entry>
            <Entry href="#typography-main-colors">Main Colors</Entry>

            <Title href="#navigation">Navigation</Title>
            <Entry href="#navigation-breadcrumbs">Breadcrumbs</Entry>
            <Entry href="#navigation-sidebars">Sidebars</Entry>

            <Title href="#components">Components</Title>
            <Entry href="#components-accordions">Accordions</Entry>
            <Entry href="#components-buttons">Buttons</Entry>
            <Entry href="#components-badges">Badges</Entry>
            <Entry href="#components-cards">Cards</Entry>
            <Entry href="#components-loaders">Loaders</Entry>
            <Entry href="#components-modals">Modals</Entry>
            <Entry href="#components-panels">Panels</Entry>
            <Entry href="#components-popovers">Popovers</Entry>
            <Entry href="#components-tabs">Tabs</Entry>

            <SidebarMenu.Title href="#data-visualization">Data Visualization</SidebarMenu.Title>
            <SidebarMenu.Entry href="#data-visualization-tables">Tables</SidebarMenu.Entry>

            <SidebarMenu.Title href="#forms">Forms</SidebarMenu.Title>
            <SidebarMenu.Entry href="#forms-vertical">Vertical</SidebarMenu.Entry>
            <SidebarMenu.Entry href="#forms-horizontal">Horizontal</SidebarMenu.Entry>
        </SidebarMenu>
    );
}
