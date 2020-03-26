import React from 'react';

import { Page } from '@borrow-ui/ui/lib';

import { Buttons } from './single-page/Buttons';
import { Colors } from './single-page/Colors';

export function SinglePage() {
    return (
        <Page title="Single Page Components Showcase">
            <Colors />
            <Buttons />
        </Page>
    );
}
