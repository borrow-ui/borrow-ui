import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';

import { IconControl } from './IconControl';

describe('Icon', () => {
    test('renders one icon', () => {
        render(<IconControl name="home" data-testid="icon" className="test-class" />);

        const icon = screen.getByTestId('icon');
        expect(icon).toHaveClass(`${UI_PREFIX}__icon-control`);
        expect(icon).toHaveClass(`${UI_PREFIX}__icon`);
        expect(icon).toHaveClass(`${UI_PREFIX}__icon--smaller`);
        expect(icon).toHaveClass(`test-class`);
    });

    test('is clickable', async () => {
        const onClick = jest.fn();
        render(<IconControl name="home" onClick={onClick} data-testid="icon" />);

        const icon = screen.getByTestId('icon');
        expect(icon).toHaveClass(`${UI_PREFIX}__icon--clickable`);

        await userEvent.click(icon);

        expect(onClick).toHaveBeenCalledTimes(1);

        await userEvent.type(icon, `{space}`);

        expect(onClick).toHaveBeenCalledTimes(2);
    });

    test('onKeyDown', async () => {
        // onKeyDown
        const onKeyDown = jest.fn();
        const onClick = jest.fn();
        render(
            <IconControl
                name="home"
                onClick={onClick}
                onKeyDown={onKeyDown}
                data-testid="icon-keydown"
            />
        );

        const iconKeyDown = screen.getByTestId('icon-keydown');

        await fireEvent.keyDown(iconKeyDown, { key: ' ', code: 'Space' });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('onKeyDown calls onClick if not set', async () => {
        // onKeyDown
        const onClick = jest.fn();
        render(<IconControl name="home" onClick={onClick} data-testid="icon-keydown" />);

        const iconKeyDown = screen.getByTestId('icon-keydown');

        await fireEvent.keyDown(iconKeyDown, { key: ' ', code: 'Space' });

        expect(onClick).toHaveBeenCalledTimes(1);

        // onKeyDown with different key
        const onClick2 = jest.fn();
        render(<IconControl name="home" onClick={onClick2} data-testid="icon-keydown2" />);

        const iconKeyDown2 = screen.getByTestId('icon-keydown2');

        await fireEvent.keyDown(iconKeyDown2, { key: '13', code: 'Enter' });

        expect(onClick2).toHaveBeenCalledTimes(0);
    });
});
