import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';

import { ReferenceOverlay } from './ReferenceOverlay';

describe('ReferenceOverlay', () => {
    test('renders trigger and content: hover', async () => {
        render(
            <div>
                <ReferenceOverlay
                    overlayContent="hover visible"
                    overlayProps={{ 'data-testid': 'hover-me-overlay' }}
                >
                    Hover me
                </ReferenceOverlay>
            </div>
        );

        const hoverMe = screen.getByText('Hover me');
        expect(screen.getByTestId('hover-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );

        // Hover
        await act(async () => {
            await fireEvent.mouseEnter(hoverMe);
        });
        expect(screen.getByTestId('hover-me-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // closes if hover outside
        await act(async () => {
            await fireEvent.mouseLeave(hoverMe);
        });
        expect(screen.getByTestId('hover-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
    });

    test('renders trigger and content: click', async () => {
        render(
            <div>
                <div>Page</div>
                <ReferenceOverlay
                    triggerMode="click"
                    overlayContent="click visible"
                    overlayProps={{ 'data-testid': 'click-me-overlay' }}
                >
                    Click me
                </ReferenceOverlay>
            </div>
        );

        const page = screen.getByText('Page');
        const clickMe = screen.getByText('Click me');
        expect(screen.getByTestId('click-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // Normal click
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.getByTestId('click-me-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // closes if click outside
        await act(async () => {
            await userEvent.click(page);
        });
        expect(screen.getByTestId('click-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
    });

    test('renders trigger and content: click persists', async () => {
        render(
            <div>
                <div>Page</div>
                <ReferenceOverlay
                    triggerMode="click"
                    clickPersist={true}
                    overlayContent="click visible"
                    overlayProps={{ 'data-testid': 'click-me-overlay' }}
                >
                    Click me
                </ReferenceOverlay>
            </div>
        );

        const page = screen.getByText('Page');
        const clickMe = screen.getByText('Click me');
        expect(screen.getByTestId('click-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // Normal click
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.getByTestId('click-me-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // do not closes if click outside
        await act(async () => {
            await userEvent.click(page);
        });
        expect(screen.getByTestId('click-me-overlay')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
        // Closes if the element is clicked again
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.getByTestId('click-me-overlay')).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
    });

    test('executes a callback when trigger is clicked', async () => {
        const onClick = jest.fn();
        render(
            <div>
                <div>Page</div>
                <ReferenceOverlay triggerMode="click" triggerProps={{ onClick }}>
                    Click me
                </ReferenceOverlay>
            </div>
        );

        const clickMe = screen.getByText('Click me');
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(onClick).toBeCalled();
    });

    test('renders in a portal', async () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute('data-testid', 'my-element');
        document.body.appendChild(elementDiv);

        const portalRef = { current: elementDiv };
        render(
            <div>
                <div>Page</div>
                <ReferenceOverlay
                    triggerMode="click"
                    portalRef={portalRef}
                    overlayContent="click visible"
                >
                    Click me
                </ReferenceOverlay>
            </div>
        );

        const clickMe = screen.getByText('Click me');
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.getByText('click visible')).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );
    });

    test('does not render if portal is not on the DOM', async () => {
        const portalRef = { current: null };
        render(
            <ReferenceOverlay
                triggerMode="click"
                portalRef={portalRef}
                overlayContent="click visible"
            >
                Click me
            </ReferenceOverlay>
        );

        const clickMe = screen.getByText('Click me');
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.queryByText('click visible')).toBeFalsy();
    });

    test('passes the right props to the arrow modifier', async () => {
        const modifiers = [
            {
                name: 'arrow',
                options: {
                    padding: 5,
                },
            },
        ];
        render(
            <ReferenceOverlay
                triggerMode="click"
                overlayContent="click visible"
                popperProps={{
                    popperModifiers: modifiers,
                }}
            >
                Click me
            </ReferenceOverlay>
        );

        const clickMe = screen.getByText('Click me');
        await act(async () => {
            await userEvent.click(clickMe);
        });
        expect(screen.queryByText('click visible')).toBeTruthy();
    });
});
