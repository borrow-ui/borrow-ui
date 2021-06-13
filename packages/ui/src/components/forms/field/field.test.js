import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../../config';

import { ALIGNMENTS, LAYOUTS, VALIGNMENTS } from '../constants';
import { Field, VField, HField } from './Field';

describe('Field', () => {
    test('renders with default layout', () => {
        render(
            <Field label="Name" description="Described" data-testid="field">
                Input here
            </Field>
        );

        const field = screen.getByTestId('field');
        expect(field).toHaveClass(`${UI_PREFIX}__form__field`);
        expect(field).toHaveClass(`${UI_PREFIX}__form__field--vertical`);
        expect(field).toHaveClass(`${UI_PREFIX}__form__field--valignment-${VALIGNMENTS.MIDDLE}`);

        const label = screen.getByText(/Name/);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label`);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label--${LAYOUTS.DEFAULT}`);

        const controller = screen.getByText(/Input here/);
        expect(controller).toHaveClass(`${UI_PREFIX}__form__field__controller`);
        expect(controller).toHaveClass(`${UI_PREFIX}__form__field__controller--${LAYOUTS.DEFAULT}`);
    });

    test('renders with extra class', () => {
        render(
            <Field label="Name" className="custom-class" data-testid="field">
                Input here
            </Field>
        );

        const field = screen.getByTestId('field');
        expect(field).toHaveClass(`${UI_PREFIX}__form__field`);
        expect(field).toHaveClass('custom-class');
    });

    test('forward props to label correctly', () => {
        render(
            <Field
                label="Name"
                required={true}
                labelWidth={123}
                labelProps={{ style: { backgroundColor: 'red' } }}
                labelAlignment={ALIGNMENTS.RIGHT}
                vAlignment={VALIGNMENTS.BOTTOM}
            >
                Input here
            </Field>
        );

        const label = screen.getByText(/Name/);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label`);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label--alignment-${ALIGNMENTS.RIGHT}`);
        expect(label).toHaveClass(`${UI_PREFIX}__form__label--valignment-${VALIGNMENTS.BOTTOM}`);
        expect(label).toHaveStyle('width: 123px; minWidth: 123px');
        expect(label).toHaveStyle('background-color: red');
    });

    test('renders with horizontal layout', () => {
        render(
            <Field
                label="Name"
                description="Described"
                layout={LAYOUTS.HORIZONTAL}
                data-testid="field"
            >
                Input here
            </Field>
        );

        const field = screen.getByTestId('field');
        expect(field).toHaveClass(`${UI_PREFIX}__form__field--horizontal`);

        const controller = screen.getByText(/Input here/);
        expect(controller).toHaveClass(`${UI_PREFIX}__form__field__controller--horizontal`);
    });

    test('is called by VField and HField helpers', () => {
        render(
            <>
                <VField label="Name V" data-testid="v-field">
                    Input V
                </VField>
                <HField label="Name H" data-testid="h-field">
                    Input H
                </HField>
            </>
        );

        const vField = screen.getByTestId('v-field');
        expect(vField).toHaveClass(`${UI_PREFIX}__form__field--vertical`);
        const hField = screen.getByTestId('h-field');
        expect(hField).toHaveClass(`${UI_PREFIX}__form__field--horizontal`);
    });
});
