import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Block } from './Block';

describe('Block', () => {
    test('renders children', () => {
        render(<Block>Content</Block>);
        const content = screen.getByText('Content');

        expect(content).toHaveClass(`${UI_PREFIX}__block`);
    });

    test('properties classes', () => {
        render(
            <Block
                separated={true}
                padded={true}
                rounded={true}
                outstanding={true}
                contentCentered={true}
            >
                Content
            </Block>
        );
        const content = screen.getByText('Content');

        expect(content).toHaveClass(`${UI_PREFIX}__block--separated`);
        expect(content).toHaveClass(`${UI_PREFIX}__block--padded`);
        expect(content).toHaveClass(`${UI_PREFIX}__block--rounded`);
        expect(content).toHaveClass(`${UI_PREFIX}__block--outstanding`);
        expect(content).toHaveClass(`${UI_PREFIX}__block--content-centered`);
    });

    test('falsy properties classes', () => {
        render(
            <Block separated={false} padded={false} rounded={false}>
                Content
            </Block>
        );
        const content = screen.getByText('Content');

        expect(content).not.toHaveClass(`${UI_PREFIX}__block--separated`);
        expect(content).not.toHaveClass(`${UI_PREFIX}__block--padded`);
        expect(content).not.toHaveClass(`${UI_PREFIX}__block--rounded`);
    });

    test('title as string', () => {
        render(<Block title="Title">Content</Block>);
        const title = screen.getByText('Title');

        expect(title).toHaveClass(`${UI_PREFIX}__block__title`);

        render(
            <Block title="Title with class" titleProps={{ className: 'test-class' }}>
                Content
            </Block>
        );
        const titleWithClass = screen.getByText('Title with class');

        expect(titleWithClass).toHaveClass(`${UI_PREFIX}__block__title`);
        expect(titleWithClass).toHaveClass(`test-class`);
    });

    test('title as component', () => {
        render(<Block title={<h3>Title</h3>}>Content</Block>);
        const title = screen.getByText('Title');

        expect(title).toBeVisible();
    });
});
