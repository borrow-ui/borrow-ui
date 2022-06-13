import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';

import { UI_PREFIX } from '../../config';
import { TestableDiv } from '../../utils/sharedTypes';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
    test('renders all elements', async () => {
        const { container } = render(<Tooltip tooltip="this will appear">Hover me</Tooltip>);
        expect(container.querySelector(`.${UI_PREFIX}__tooltip`)).toBeInTheDocument();
        expect(container.querySelector(`.${UI_PREFIX}__tooltip__arrow`)).toBeInTheDocument();
    });

    test('renders the trigger and shows tooltip', async () => {
        const { container } = render(
            <Tooltip
                tooltip="this will appear"
                tooltipProps={{ 'data-testid': 'tooltip-overlay' } as TestableDiv}
            >
                Hover me
            </Tooltip>
        );

        const hoverMe = screen.getByText('Hover me');
        expect(screen.getByTestId('tooltip-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        expect(screen.getByTestId('tooltip-overlay')).toHaveClass(`${UI_PREFIX}__tooltip`);
        expect(container.querySelector(`.${UI_PREFIX}__tooltip__arrow`)).toBeInTheDocument();

        // Hover
        await act(async () => {
            fireEvent.mouseEnter(hoverMe);
        });
        expect(screen.getByTestId('tooltip-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
    });

    test('renders the trigger and shows tooltip', async () => {
        const { container } = render(
            <Tooltip
                tooltip="this will appear"
                tooltipProps={{ 'data-testid': 'tooltip-overlay' } as TestableDiv}
                tooltipArrowProps={{ 'data-testid': 'tooltip-arrow' } as TestableDiv}
                placement="bottom"
                triggerMode="click"
                minWidth={false}
                maxWidth={false}
                className="my-class"
            >
                Click me
            </Tooltip>
        );

        const clickMe = screen.getByText('Click me');
        expect(screen.getByTestId('tooltip-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        expect(clickMe).toHaveClass('my-class');

        // Click
        await act(async () => {
            fireEvent.click(clickMe);
        });
        expect(screen.getByTestId('tooltip-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        expect(screen.getByTestId('tooltip-arrow')).toHaveClass(
            `${UI_PREFIX}__reference-overlay__arrow`
        );
    });
});
