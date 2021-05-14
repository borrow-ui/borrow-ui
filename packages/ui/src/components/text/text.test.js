import React from 'react';
import { render, screen } from '@testing-library/react';

import { Monospace } from './Monospace';
import { Text } from './Text';
import { TextContainer } from './TextContainer';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { UI_PREFIX } from '../../config';

describe('text components', () => {
    test('renders Text', () => {
        render(<Text className="extra-class">Text here</Text>);

        expect(screen.getByText('Text here')).toHaveClass(`${UI_PREFIX}__text`);
        expect(screen.getByText('Text here')).toHaveClass(`extra-class`);

        render(<Text tag="span">As span</Text>);
        expect(screen.getByText('As span', { selector: 'span' })).toBeInTheDocument();

        render(<Text size="big">Big one</Text>);
        expect(screen.getByText('Big one')).toHaveClass(`${UI_PREFIX}__text--big`);
        render(<Text size="small">Small one</Text>);
        expect(screen.getByText('Small one')).toHaveClass(`${UI_PREFIX}__text--small`);
    });

    test('renders Monospace', () => {
        render(<Monospace>Code only</Monospace>);
        expect(screen.getByText('Code only')).toHaveClass(`${UI_PREFIX}__text__monospace`);

        render(<Monospace className="extra-class">Double class</Monospace>);
        expect(screen.getByText('Double class')).toHaveClass(`${UI_PREFIX}__text__monospace`);
        expect(screen.getByText('Double class')).toHaveClass(`extra-class`);
    });

    test('renders Subtitle', () => {
        render(<Subtitle>Description</Subtitle>);
        expect(screen.getByText('Description')).toHaveClass(`${UI_PREFIX}__text__subtitle`);

        render(<Subtitle className="extra-class">Double class</Subtitle>);
        expect(screen.getByText('Double class')).toHaveClass(`${UI_PREFIX}__text__subtitle`);
        expect(screen.getByText('Double class')).toHaveClass(`extra-class`);
    });

    test('renders TextContainer', () => {
        render(<TextContainer>Description</TextContainer>);
        expect(screen.getByText('Description')).toHaveClass(`${UI_PREFIX}__text-container`);

        render(
            <TextContainer className="extra-class" centered={true}>
                Triple class
            </TextContainer>
        );
        expect(screen.getByText('Triple class')).toHaveClass(`${UI_PREFIX}__text-container`);
        expect(screen.getByText('Triple class')).toHaveClass(
            `${UI_PREFIX}__text-container--centered`
        );
        expect(screen.getByText('Triple class')).toHaveClass(`extra-class`);
    });

    test('renders Title', () => {
        render(<Title>I am title</Title>);
        expect(screen.getByText('I am title')).toHaveClass(`${UI_PREFIX}__title`);

        render(<Title tag="h2">Smaller</Title>);
        expect(screen.getByText('Smaller', { selector: 'h2' })).toBeInTheDocument();

        render(<Title className="extra-class">Double class</Title>);
        expect(screen.getByText('Double class')).toHaveClass(`${UI_PREFIX}__title`);
        expect(screen.getByText('Double class')).toHaveClass('extra-class');

        // Anchor
        render(<Title anchor="here">Anchor</Title>);
        expect(screen.getByText('Anchor')).toHaveClass(`${UI_PREFIX}__title__anchor`);
        // Active Anchor
        const hash = window.location.hash;
        window.location.hash = 'mocked?param=1&a=b#something';
        render(<Title anchor="mocked">Active Anchor</Title>);
        expect(screen.getByText('Active Anchor')).toHaveClass(
            `${UI_PREFIX}__title__anchor--active`
        );
        window.location.hash = hash;
    });
});
