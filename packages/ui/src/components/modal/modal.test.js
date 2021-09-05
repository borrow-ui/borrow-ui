import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';

import { Modal } from './Modal';

describe('Modal', () => {
    test('renders trigger and content', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    wrapperProps: { 'data-testid': 'wrapper' },
                    containerProps: { 'data-testid': 'container' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        const wrapper = screen.queryByTestId('wrapper');
        expect(trigger).toBeInTheDocument();
        expect(wrapper).not.toBeInTheDocument();

        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        const mWrapper = screen.getByTestId('wrapper');
        const mContainer = screen.getByTestId('container');
        // should have default classes
        expect(mWrapper).toHaveClass(`${UI_PREFIX}__modal__wrapper`);
        expect(mContainer).toHaveClass(`${UI_PREFIX}__modal__container`);
        expect(mContainer).toHaveClass(`${UI_PREFIX}__modal__container--default`);
    });

    test('renders with footer and uses setVisible in modal', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={({ setVisible }) => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    footer: <button onClick={() => setVisible(false)}>Close me</button>,
                    wrapperProps: { 'data-testid': 'wrapper' },
                    containerProps: { 'data-testid': 'container' },
                    contentProps: { 'data-testid': 'content' },
                    footerProps: { 'data-testid': 'footer' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');

        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        const content = screen.getByTestId('content');
        const footer = screen.getByTestId('footer');
        // should have default classes
        expect(content).toHaveClass(`${UI_PREFIX}__modal__content--header--footer`);
        expect(footer).toHaveClass(`${UI_PREFIX}__modal__footer`);
    });

    test('maximize and minimize', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    wrapperProps: { 'data-testid': 'wrapper' },
                    containerProps: { 'data-testid': 'container' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        const maximize = screen.getByTestId('modal-maximize-icon');
        const close = screen.getByTestId('modal-close-icon');

        // should have default classes
        expect(maximize).toHaveClass(`${UI_PREFIX}__icon--clickable`);
        expect(screen.queryByTestId('modal-minimize-icon')).not.toBeInTheDocument();
        expect(close).toHaveClass(`${UI_PREFIX}__icon--clickable`);

        // should maximize and minimize
        await userEvent.click(maximize);

        expect(screen.queryByTestId('modal-maximize-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('modal-minimize-icon')).toBeInTheDocument();

        const mContainer = screen.getByTestId('container');
        expect(mContainer).toHaveClass(`${UI_PREFIX}__modal__container--maximized`);

        const minimize = screen.getByTestId('modal-minimize-icon');

        await userEvent.click(minimize);

        expect(screen.getByTestId('modal-maximize-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('modal-minimize-icon')).not.toBeInTheDocument();
    });

    test('opens as maximized', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    containerProps: { 'data-testid': 'container' },
                    maximized: true,
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('container')).toBeInTheDocument();
        });

        const minimize = screen.getByTestId('modal-minimize-icon');
        const mContainer = screen.getByTestId('container');

        // should have default classes
        expect(minimize).toHaveClass(`${UI_PREFIX}__icon--clickable`);
        expect(screen.queryByTestId('modal-maximize-icon')).not.toBeInTheDocument();
        expect(mContainer).toHaveClass(`${UI_PREFIX}__modal__container--maximized`);
    });

    test('open and close', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    wrapperProps: { 'data-testid': 'wrapper' },
                    containerProps: { 'data-testid': 'container' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        const close = screen.getByTestId('modal-close-icon');

        expect(screen.getByTestId('container')).toBeInTheDocument();

        await userEvent.click(close);

        expect(screen.queryByTestId('container')).not.toBeInTheDocument();
    });

    test('closes on ESC', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    wrapperProps: { 'data-testid': 'wrapper' },
                    containerProps: { 'data-testid': 'container' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        await fireEvent.keyDown(window, { keyCode: 27, code: 'Escape' });

        expect(screen.queryByTestId('wrapper')).not.toBeInTheDocument();
    });

    test('do not show close icon', async () => {
        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    showCloseIcon: false,
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByText('Modal Content')).toBeInTheDocument();
        });

        expect(screen.queryByTestId('modal-close-icon')).not.toBeInTheDocument();
    });

    test('does something on close with closeModal', async () => {
        const doSomething = jest.fn();

        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={({ setVisible }) => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    closeModal: () => {
                        doSomething();
                        setVisible(false);
                    },
                    wrapperProps: { 'data-testid': 'wrapper' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        await userEvent.click(screen.getByTestId('modal-close-icon'));

        expect(doSomething).toHaveBeenCalledTimes(1);
        expect(screen.queryByTestId('wrapper')).not.toBeInTheDocument();
    });

    test('executes onOpen callback', async () => {
        const doSomething = jest.fn();

        render(
            <Modal
                Trigger={({ setVisible }) => (
                    <span onClick={() => setVisible((v) => !v)} data-testid="trigger">
                        Click to open
                    </span>
                )}
                getModalWindowProps={() => ({
                    title: 'Modal Title',
                    content: 'Modal Content',
                    hooks: { onOpen: doSomething },
                    wrapperProps: { 'data-testid': 'wrapper' },
                })}
            />
        );

        const trigger = screen.getByText('Click to open');
        await act(async () => {
            await userEvent.click(trigger);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('wrapper')).toBeInTheDocument();
        });

        expect(doSomething).toHaveBeenCalledTimes(1);
    });
});
