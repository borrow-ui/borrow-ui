import React from 'react';
import { render, screen } from '@testing-library/react';

import { SyntaxHighlight } from './SyntaxHighlight';
import { UI_PREFIX } from '../../config';

let code = `# comment
let c = 1;
`;

jest.mock('prismjs', () => ({ highlightElement: jest.fn() }));

describe('SyntaxHighlight', () => {
    test('renders', () => {
        const { container } = render(<SyntaxHighlight code={code} data-testid="sh" />);
        expect(screen.getByTestId('sh')).toHaveClass(`${UI_PREFIX}__syntax-highlight`);
        expect(container.querySelector('code')).toHaveClass(`language-jsx`);
        const prismjs = require('prismjs');
        const highlightElement = jest.spyOn(prismjs, 'highlightElement');
        expect(highlightElement).toBeCalled();
    });

    test('renders with no plugins', () => {
        const { container } = render(<SyntaxHighlight code={code} data-test-id="sh" />);
        expect(container.querySelector('code')).toHaveClass(`language-jsx`);
    });

    test('renders with plugins', () => {
        const { container } = render(
            <SyntaxHighlight code={code} data-test-id="sh" plugins={['line-numbers']} />
        );
        expect(container.querySelector('pre')).toHaveClass(`line-numbers`);
    });
});
