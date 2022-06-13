import React from 'react';
import { render, screen } from '@testing-library/react';

import { Row, Col } from './Grid';

describe('Grid = Row and Col ', () => {
    test('renders Row', () => {
        render(<Row>Content</Row>);
        const content = screen.getByText('Content');

        expect(content).toHaveClass(`row`);
    });
    test('renders Row with a custom class', () => {
        render(
            <Row className="my-class" data-testid="row">
                Content
            </Row>
        );
        const content = screen.getByTestId('row');

        expect(content).toHaveClass(`row`);
        expect(content).toHaveClass(`my-class`);
    });
    test('renders Col', () => {
        //  with default classes
        render(<Col>Content</Col>);
        const content = screen.getByText('Content');
        expect(content).toHaveClass(`col-xs-12 col-sm-6`);

        //  with size
        render(<Col size={12}>Content Size</Col>);
        const contentSize = screen.getByText('Content Size');
        expect(contentSize).toHaveClass(`col-xs-12`);
        expect(contentSize).toHaveClass(`col-sm-12`);

        //  with overridden col modifiers and custom class
        render(
            <Col colClassName="col-xs-4 col-lg-1" className="test-class">
                Content Custom
            </Col>
        );
        const contentCustom = screen.getByText('Content Custom');
        expect(contentCustom).toHaveClass(`col-xs-4`);
        expect(contentCustom).toHaveClass(`col-lg-1`);
        expect(contentCustom).toHaveClass(`test-class`);
    });
});
