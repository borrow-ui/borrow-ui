import React from 'react';
import { render, screen } from '@testing-library/react';

import { Lorem } from './Lorem';

describe('Lorem', () => {
    test('renders with 2 paragraphs (default)', () => {
        render(<Lorem />);
        const p1 = screen.getByText(/Lorem ipsum dolor sit amet/);
        const p2 = screen.getByText(/Etiam tortor orci/);
        const p3 = screen.queryByText(/Sed sed odio sapien/);

        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
        expect(p3).not.toBeInTheDocument();
    });
    test('renders with 1 paragraph', () => {
        render(<Lorem paragraphs={1} />);
        const p1 = screen.getByText(/Lorem ipsum dolor sit amet/);
        const p2 = screen.queryByText(/Etiam tortor orci/);
        const p3 = screen.queryByText(/Sed sed odio sapien/);

        expect(p1).toBeInTheDocument();
        expect(p2).not.toBeInTheDocument();
        expect(p3).not.toBeInTheDocument();
    });
    test('renders with >=3 paragraphs', () => {
        const { container } = render(<Lorem paragraphs={4} />);
        const p1 = screen.getByText(/Lorem ipsum dolor sit amet/);
        const p2 = screen.getByText(/Etiam tortor orci/);
        const p3 = screen.queryByText(/Sed sed odio sapien/);

        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
        expect(p3).toBeInTheDocument();

        expect(container.querySelectorAll('p').length).toBe(3);
    });
});
