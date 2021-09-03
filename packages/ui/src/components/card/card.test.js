import React, { Fragment } from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Card } from './Card';

describe('Card', () => {
    test('renders title, subtitle and description', () => {
        render(
            <Card
                title="Home"
                subtitle="Main residence"
                description="This is the address"
                mainProps={{ 'data-testid': 'main-container' }}
                bodyProps={{ 'data-testid': 'body-container' }}
                data-testid="card-container"
            />
        );

        const title = screen.getByText('Home');
        const subtitle = screen.getByText('Main residence');
        const description = screen.getByText('This is the address');
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(description).toBeInTheDocument();

        expect(title).toHaveClass(`${UI_PREFIX}__card__title`);
        expect(subtitle).toHaveClass(`${UI_PREFIX}__card__subtitle`);
        expect(description).toHaveClass(`${UI_PREFIX}__card__description`);

        const card = screen.getByTestId('card-container');
        expect(card).toHaveClass(`${UI_PREFIX}__card`);
        const main = screen.getByTestId('main-container');
        expect(main).toHaveClass(`${UI_PREFIX}__card__main`);
        expect(main).toHaveClass(`${UI_PREFIX}__card__main--without-side`);
        const body = screen.getByTestId('body-container');
        expect(body).toHaveClass(`${UI_PREFIX}__card__body`);
    });

    test('applies modifiers', () => {
        render(
            <Card
                title="Home"
                description="This is the address"
                shadowed={true}
                marginBetween={true}
                standingHover={true}
                data-testid="card-container"
            />
        );

        const card = screen.getByTestId('card-container');
        expect(card).toHaveClass(`${UI_PREFIX}__card--shadowed`);
        expect(card).toHaveClass(`${UI_PREFIX}__card--margin-between`);
        expect(card).toHaveClass(`${UI_PREFIX}__card--standing-hover`);

        render(
            <Card
                title="Home"
                description="Without Shadow"
                shadowed={false}
                data-testid="card-container-flat"
            />
        );
        const flatCard = screen.getByTestId('card-container-flat');
        expect(flatCard).not.toHaveClass(`${UI_PREFIX}__card--shadowed`);
    });

    test('renders icon on the side', () => {
        render(
            <Card
                icon="home"
                title="Home"
                description="This is the address"
                sideProps={{ 'data-testid': 'side-container' }}
                iconContainerProps={{ 'data-testid': 'icon-container' }}
                mainProps={{ 'data-testid': 'main-container' }}
            />
        );

        const side = screen.getByTestId('side-container');
        expect(side).toHaveClass(`${UI_PREFIX}__card__side`);
        const iconContainer = screen.getByTestId('icon-container');
        expect(iconContainer).toHaveClass(`${UI_PREFIX}__card__side__icon-container`);
        const main = screen.getByTestId('main-container');
        expect(main).toHaveClass(`${UI_PREFIX}__card__main--with-side`);
    });

    test('renders a custom content on the side', () => {
        render(
            <Card
                sideContent="I am on the side"
                title="Home"
                description="Content"
                sideProps={{ 'data-testid': 'side-container' }}
            />
        );

        const side = screen.getByTestId('side-container');
        expect(side).toHaveClass(`${UI_PREFIX}__card__side`);
        const sideContent = screen.getByText('I am on the side');
        expect(sideContent).toBeInTheDocument();
    });

    test('renders with controls', () => {
        render(
            <Card
                title="Home"
                description="This is the address"
                controls={
                    <Fragment>
                        <span>Left</span>
                        <span>Right</span>
                    </Fragment>
                }
                controlsProps={{ 'data-testid': 'controls-container' }}
            />
        );

        const description = screen.getByText('This is the address');
        expect(description).toHaveClass(`${UI_PREFIX}__card__description--with-controls`);

        const controls = screen.getByTestId('controls-container');
        expect(controls).toHaveClass(`${UI_PREFIX}__card__controls`);
        expect(screen.getByText('Left')).toBeInTheDocument();
        expect(screen.getByText('Right')).toBeInTheDocument();
    });
});
