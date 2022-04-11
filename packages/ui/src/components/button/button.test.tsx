import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Button } from './Button';

describe('Button', () => {
    test('renders with defaults', () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(`${UI_PREFIX}__button`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--neutral`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--normal`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--separated`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--shadowed`);
    });

    test('applies modifiers', () => {
        render(
            <Button flat={true} separated={false} size="small" mean="primary" disabled={true}>
                Click me
            </Button>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass(`${UI_PREFIX}__button`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--primary`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--small`);
        expect(button).toHaveClass(`${UI_PREFIX}__button--disabled`);
        expect(button).not.toHaveClass(`${UI_PREFIX}__button--separated`);
        expect(button).not.toHaveClass(`${UI_PREFIX}__button--shadowed`);
    });

    test('uses a custom tag', () => {
        const { container } = render(<Button tag="a">Click me</Button>);

        const span = container.querySelector('a');
        expect(span).toHaveTextContent('Click me');
    });

    test('renders with icon', () => {
        const { container } = render(
            <Button icon="home" iconProps={{ className: 'test-icon' }}>
                Click me
            </Button>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass(`${UI_PREFIX}__button--icon`);

        const icon = container.querySelector('i');
        expect(icon).toHaveClass('test-icon');
    });
});
