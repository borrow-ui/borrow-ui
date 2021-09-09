import { act, render, screen } from '@testing-library/react';

import App from './App';

test('renders welcome title', async () => {
    render(<App />);

    // Wait the store to be setup
    await act(async () => {
        screen.getByText(/welcome user/i);
    });

    expect(screen.getByText(/welcome user/i)).toBeInTheDocument();
});
