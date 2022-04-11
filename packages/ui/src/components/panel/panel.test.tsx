import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';
import { TestableDiv } from '../../utils/sharedTypes';

import { Panel } from './Panel';

describe('Panel', () => {
    test('renders trigger and content', async () => {
        render(
            <Panel
                Trigger={({ setVisible }) => (
                    <button onClick={() => setVisible(true)}>Open Panel</button>
                )}
                getPanelContentProps={() => ({
                    title: 'Panel demo title',
                    content: <div>A long content</div>,
                    footer: 'Footer content',
                    containerProps: { 'data-testid': 'container' } as TestableDiv,
                    footerProps: { 'data-testid': 'footer' } as TestableDiv,
                })}
            />
        );

        const trigger = screen.getByText('Open Panel');
        const container = screen.queryByTestId('container');
        expect(trigger).toBeInTheDocument();
        expect(container).not.toBeInTheDocument();

        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('container')).toBeInTheDocument();
        });

        const pContainer = screen.getByTestId('container');
        // should have default classes
        expect(pContainer).toHaveClass(`${UI_PREFIX}__panel__container`);

        const footer = screen.getByTestId('footer');
        // should have default classes
        expect(footer).toHaveClass(`${UI_PREFIX}__panel__footer`);

        // it closes by clicking the close Icon
        const close = screen.getByTestId('panel-close-icon');
        await userEvent.click(close);
        expect(screen.queryByTestId('container')).not.toBeInTheDocument();
    });

    test('executes onOpen callback', async () => {
        const doSomething = jest.fn();

        render(
            <Panel
                Trigger={({ setVisible }) => (
                    <button onClick={() => setVisible(true)}>Open Panel</button>
                )}
                getPanelContentProps={() => ({
                    title: 'Panel Title',
                    content: 'Panel Content',
                    hooks: {
                        onOpen: ({ resolve }) => {
                            doSomething();
                            resolve(true);
                        },
                    },
                })}
            />
        );

        const trigger = screen.getByText('Open Panel');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByText('Panel Content')).toBeInTheDocument();
        });

        expect(doSomething).toHaveBeenCalledTimes(1);
    });

    test('opens one panel after the other', async () => {
        render(
            <div>
                <Panel
                    Trigger={({ setVisible }) => (
                        <button onClick={() => setVisible(true)}>Open Panel 1</button>
                    )}
                    getPanelContentProps={() => ({
                        content: 'Panel 1 Content',
                    })}
                />
                <Panel
                    Trigger={({ setVisible }) => (
                        <button onClick={() => setVisible(true)}>Open Panel 2</button>
                    )}
                    getPanelContentProps={() => ({
                        content: 'Panel 2 Content',
                    })}
                />
            </div>
        );

        const trigger1 = screen.getByText('Open Panel 1');
        const trigger2 = screen.getByText('Open Panel 2');

        await act(async () => {
            await userEvent.click(trigger1);
        });

        await waitFor(() => {
            expect(screen.queryByText('Panel 1 Content')).toBeInTheDocument();
        });

        await act(async () => {
            await userEvent.click(trigger2);
        });

        await waitFor(() => {
            expect(screen.queryByText('Panel 2 Content')).toBeInTheDocument();
        });

        const close = screen.getByTestId('panel-close-icon');
        await userEvent.click(close);

        expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument();
        expect(screen.queryByText('Panel 2 Content')).not.toBeInTheDocument();
    });

    test('closes if click the wrapper', async () => {
        render(
            <div>
                <Panel
                    Trigger={({ setVisible }) => (
                        <button onClick={() => setVisible(true)}>Open Panel</button>
                    )}
                    getPanelContentProps={() => ({
                        content: 'Panel Content',
                    })}
                />
            </div>
        );

        const trigger = screen.getByText('Open Panel');
        const panelWrapper = screen.getByTestId('panel-wrapper');

        await act(async () => {
            await userEvent.click(trigger);
        });
        await waitFor(() => {
            expect(screen.queryByText('Panel Content')).toBeInTheDocument();
        });

        await act(async () => {
            await userEvent.click(panelWrapper);
        });

        expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();
    });
});
