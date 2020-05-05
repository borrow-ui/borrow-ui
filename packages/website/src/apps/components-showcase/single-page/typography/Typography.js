import React from 'react';

import { Title } from '@borrow-ui/ui';

import { MainColors } from './MainColors';
import { Texts } from './Texts';
import { Titles } from './Titles';

export function Typography() {
    return (
        <div className="m-b-20">
            <Title anchor="typography" className="color-primary">
                Typography
            </Title>

            <Title tag="h2" anchor="typography-titles" className="m-b-0">
                Titles
            </Title>
            <Titles />

            <Title tag="h2" anchor="typography-text" className="m-b-0">
                Text
            </Title>
            <Texts />

            <Title tag="h2" anchor="typography-main-colors" className="m-b-0">
                Main Colors
            </Title>
            <MainColors />
        </div>
    );
}
