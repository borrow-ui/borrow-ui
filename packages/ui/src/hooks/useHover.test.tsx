import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';

import { useHover } from './useHover';

function TestHover(): JSX.Element {
    const [hoverRef, isHovered] = useHover();

    return (
        <div>
            <a href="/" ref={hoverRef}>
                Trigger
            </a>
            {isHovered ? <div>Hovered</div> : <div>Somewhere else</div>}
        </div>
    );
}

describe('useHover', () => {
    test('correctly detects mouse over', async () => {
        render(<TestHover />);

        const trigger = screen.getByText('Trigger');

        // Hover
        await act(async () => {
            fireEvent.mouseEnter(trigger);
        });
        expect(screen.queryByText('Hovered')).toBeVisible();
        expect(screen.queryByText('Somewhere else')).toBeNull();
        // closes if hover outside
        await act(async () => {
            fireEvent.mouseLeave(trigger);
        });
        expect(screen.queryByText('Hovered')).toBeNull();
        expect(screen.queryByText('Somewhere else')).toBeVisible();
    });
});
