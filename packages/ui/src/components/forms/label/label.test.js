import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../../config';

import { LAYOUTS, ALIGNMENTS, VALIGNMENTS } from '../constants';
import { Label } from './Label';

describe('Label', () => {
    test('renders with default layout', () => {
        render(<Label label="Name" />);

        const label = screen.getByText(/Name/);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label`);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label--${LAYOUTS.DEFAULT}`);
    });

    test('renders with specified layouts', async () => {
        render(
            <>
                <Label label="Horizontal L" layout={LAYOUTS.HORIZONTAL} />
                <Label label="Vertical L" layout={LAYOUTS.VERTICAL} />
            </>
        );

        const hLabel = screen.getByText(/Horizontal L/);
        expect(hLabel).toHaveClass(`${UI_PREFIX}__form__label--${LAYOUTS.HORIZONTAL}`);
        const vLabel = screen.getByText(/Vertical L/);
        expect(vLabel).toHaveClass(`${UI_PREFIX}__form__label--${LAYOUTS.VERTICAL}`);
    });

    test('has a required mark', () => {
        render(<Label label="Name" required={true} />);

        const requiredMark = screen.getByText(/\*/);
        expect(requiredMark).toHaveClass(`${UI_PREFIX}__form__label--required`);
    });

    test('sets a width and minWidth style', () => {
        render(<Label label="Name" width={123} />);

        const label = screen.getByText(/Name/);
        expect(label).toHaveStyle(`width: 123px; minWidth: 123px`);
    });

    test('applies horizontal alignment class', () => {
        render(
            <>
                <Label label="Name L" alignment={ALIGNMENTS.LEFT} />
                <Label label="Name R" alignment={ALIGNMENTS.RIGHT} />
                <Label label="Name C" alignment={ALIGNMENTS.CENTER} />
            </>
        );

        const lLabel = screen.getByText(/Name L/);
        expect(lLabel).toHaveClass(`${UI_PREFIX}__form__label--alignment-${ALIGNMENTS.LEFT}`);
        const rLabel = screen.getByText(/Name R/);
        expect(rLabel).toHaveClass(`${UI_PREFIX}__form__label--alignment-${ALIGNMENTS.RIGHT}`);
        const cLabel = screen.getByText(/Name C/);
        expect(cLabel).toHaveClass(`${UI_PREFIX}__form__label--alignment-${ALIGNMENTS.CENTER}`);
    });

    test('applies vertical alignment class', () => {
        render(
            <>
                <Label label="Name T" vAlignment={VALIGNMENTS.TOP} />
                <Label label="Name B" vAlignment={VALIGNMENTS.BOTTOM} />
                <Label label="Name M" vAlignment={VALIGNMENTS.MIDDLE} />
            </>
        );

        const tLabel = screen.getByText(/Name T/);
        expect(tLabel).toHaveClass(`${UI_PREFIX}__form__label--valignment-${VALIGNMENTS.TOP}`);
        const bLabel = screen.getByText(/Name B/);
        expect(bLabel).toHaveClass(`${UI_PREFIX}__form__label--valignment-${VALIGNMENTS.BOTTOM}`);
        const mLabel = screen.getByText(/Name M/);
        expect(mLabel).toHaveClass(`${UI_PREFIX}__form__label--valignment-${VALIGNMENTS.MIDDLE}`);
    });
});
