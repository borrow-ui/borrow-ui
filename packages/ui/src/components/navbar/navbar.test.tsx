import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';

import { Navbar } from './Navbar';

describe('Navbar', () => {
    test('renders the main component with three sections', () => {
        render(
            <Navbar
                left={'I am left'}
                center={<span>I am center</span>}
                right={<span>I am right</span>}
                className="test-class"
                data-testid="navbar"
            />
        );

        expect(screen.queryByText('I am left')).toBeInTheDocument();
        expect(screen.queryByText('I am center')).toBeInTheDocument();
        expect(screen.queryByText('I am right')).toBeInTheDocument();

        const navbar = screen.getByTestId('navbar');
        // should have default classes and the one added
        expect(navbar).toHaveClass(`${UI_PREFIX}__navbar`);
        expect(navbar).toHaveClass(`${UI_PREFIX}__navbar--sticky`);
        expect(navbar).toHaveClass(`test-class`);
    });

    test('renders a fixed Navbar that has an item with body (NavbarBody)', async () => {
        render(
            <Navbar
                sticky={false}
                fixed={true}
                left={[
                    {
                        headerLabel: 'Item with menu',
                        bodyItem: function ItemBody({ resetState }: any) {
                            return (
                                <div>
                                    Lorem Ipsum
                                    <button onClick={resetState}>Close me</button>
                                </div>
                            );
                        },
                    },
                ]}
                right={[
                    {
                        headerLabel: 'User settings',
                        bodyItem: function ItemBody() {
                            return <div>User data</div>;
                        },
                    },
                    {
                        headerLabel: 'Auth',
                        bodyItem: function ItemBody() {
                            return <button>Logout</button>;
                        },
                        hideControls: true,
                    },
                ]}
                data-testid="navbar"
            />
        );

        const navbar = screen.getByTestId('navbar');
        expect(navbar).toHaveClass(`${UI_PREFIX}__navbar--fixed`);

        const menuItem = screen.getByText('Item with menu');
        expect(menuItem).toBeInTheDocument();

        // should have default classes
        expect(menuItem).toHaveClass(`${UI_PREFIX}__navbar__group__item`);
        expect(menuItem).toHaveClass(`${UI_PREFIX}__navbar__group__item--clickable`);

        // should open the body
        await userEvent.click(menuItem);
        expect(screen.queryByText(/Lorem Ipsum/)).toBeInTheDocument();

        // should close the body by clicking on close
        const closeButton = screen.getByRole('button', { name: 'Close me' });
        expect(closeButton).toBeInTheDocument();
        await userEvent.click(closeButton);
        expect(screen.queryByText(/Lorem Ipsum/)).not.toBeInTheDocument();

        // should close the body by clicking again on the same item
        await userEvent.click(menuItem);
        expect(screen.queryByText(/Lorem Ipsum/)).toBeInTheDocument();
        await userEvent.click(menuItem);
        expect(screen.queryByText(/Lorem Ipsum/)).not.toBeInTheDocument();

        // should close the body by clicking on the "X" inside the body
        await userEvent.click(menuItem);
        expect(screen.queryByText(/Lorem Ipsum/)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId('navbar-controls-close'));
        expect(screen.queryByText(/Lorem Ipsum/)).not.toBeInTheDocument();

        // should keep the body open if another item with body is clicked
        const userSettings = screen.queryByText('User settings');
        await userEvent.click(menuItem);
        expect(screen.queryByText(/Lorem Ipsum/)).toBeInTheDocument();

        if (!userSettings) throw new Error('User settings label not found');

        await userEvent.click(userSettings);
        expect(screen.queryByText(/Lorem Ipsum/)).not.toBeInTheDocument();
        expect(screen.queryByText(/User data/)).toBeInTheDocument();

        // should have a body without controls
        const auth = screen.queryByText('Auth');
        if (!auth) throw new Error('Auth label not found');
        await userEvent.click(auth);
        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
        expect(screen.queryByTestId('navbar-controls-close')).not.toBeInTheDocument();
    });

    test('query should be handled and reflect changes in body', async () => {
        render(
            <Navbar
                right={[
                    {
                        headerLabel: 'Text me',
                        bodyItem: function ItemBody({ query }: any) {
                            return (
                                <div>
                                    {query !== 'hello' && <span>No one waves</span>}
                                    {query === 'hello' && <span>Hi there!</span>}
                                </div>
                            );
                        },
                        showQueryInput: true,
                    },
                ]}
            />
        );

        const menuItem = screen.getByText('Text me');
        await userEvent.click(menuItem);
        // Type "hi"
        await userEvent.type(screen.getByRole('textbox'), 'hi');
        expect(screen.queryByText(/No one waves/)).toBeInTheDocument();
        expect(screen.queryByText(/Hi there/)).not.toBeInTheDocument();
        // Delete and type "hello"
        await userEvent.type(screen.getByRole('textbox'), '{selectall}{backspace}');
        await userEvent.type(screen.getByRole('textbox'), 'hello');
        expect(screen.queryByText(/No one waves/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hi there/)).toBeInTheDocument();
    });

    test('floating controls adds the proper classes', async () => {
        render(
            <Navbar
                right={[
                    {
                        headerLabel: 'Text me',
                        bodyItem: function ItemBody() {
                            return <span>Test</span>;
                        },
                        floatingControls: true,
                    },
                ]}
            />
        );

        const menuItem = screen.getByText('Text me');
        await userEvent.click(menuItem);
        const bodyHeaderControls = screen.getByTestId('navbar-controls');
        expect(bodyHeaderControls).toHaveClass(`${UI_PREFIX}__navbar__controls`);
        expect(bodyHeaderControls).toHaveClass(`${UI_PREFIX}__navbar__controls--floating`);
    });
});
