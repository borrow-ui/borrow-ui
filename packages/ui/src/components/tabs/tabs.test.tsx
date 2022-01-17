import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, FIRST_OPEN_LESS_EQUAL_TABS_NUMBER } from './Tabs';
import { UI_PREFIX } from '../../config';

describe('Tabs', () => {
    test('renders with two tabs', async () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} data-testid="tabs" />);

        expect(screen.getByTestId('tabs')).toHaveClass(`${UI_PREFIX}__tabs`);
        expect(screen.getByText('First')).toHaveClass(`${UI_PREFIX}__tabs__header__label`);
        expect(screen.getByText('The first tab')).toHaveClass(`${UI_PREFIX}__tabs__body`);
        expect(screen.getByText('Second')).toHaveClass(`${UI_PREFIX}__tabs__header__label`);
        expect(screen.getByText('The second tab')).toHaveClass(`${UI_PREFIX}__tabs__body`);

        // Fist should be selected
        expect(screen.getByText('First')).toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The first tab')).toHaveClass(`${UI_PREFIX}__tabs__body--selected`);
        expect(screen.getByText('Second')).not.toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The second tab')).not.toHaveClass(
            `${UI_PREFIX}__tabs__body--selected`
        );
        // Clicking the second tab should make the second selected
        await userEvent.click(screen.getByText('Second'));
        expect(screen.getByText('First')).not.toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The first tab')).not.toHaveClass(
            `${UI_PREFIX}__tabs__body--selected`
        );
        expect(screen.getByText('Second')).toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The second tab')).toHaveClass(
            `${UI_PREFIX}__tabs__body--selected`
        );
    });

    test('renders with two tabs with the second active', () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} firstOpen={2} />);

        expect(screen.getByText('First')).not.toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The first tab')).not.toHaveClass(
            `${UI_PREFIX}__tabs__body--selected`
        );
        expect(screen.getByText('Second')).toHaveClass(
            `${UI_PREFIX}__tabs__header__label--selected`
        );
        expect(screen.getByText('The second tab')).toHaveClass(
            `${UI_PREFIX}__tabs__body--selected`
        );
    });
    test('throws an error if the firstOpen tab does not exists', () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        const err = console.error;
        console.error = jest.fn();
        expect(() => {
            render(<Tabs tabs={tabs} firstOpen={3} />);
        }).toThrowError(FIRST_OPEN_LESS_EQUAL_TABS_NUMBER);
        console.error = err;
    });

    test('tests TabBody props: padded', () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} padded={true} />);
        expect(screen.getByText('The first tab')).toHaveClass(`${UI_PREFIX}__tabs__body--padded`);
    });
    test('tests TabBody props: paddedTop', () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} paddedTop={true} padded={false} />);
        expect(screen.getByText('The first tab')).toHaveClass(
            `${UI_PREFIX}__tabs__body--padded-top`
        );
        expect(screen.getByText('The first tab')).not.toHaveClass(
            `${UI_PREFIX}__tabs__body--padded`
        );
    });
    test('tests TabBody props: applies rest props', async () => {
        const onClick = jest.fn();
        const tabs = [
            { label: 'First', content: 'The first tab', className: 'forwarded', onClick },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} padded={true} />);
        expect(screen.getByText('The first tab')).toHaveClass('forwarded');
        await userEvent.click(screen.getByText('The first tab'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
    test('tests TabHeader props: extraHeader', () => {
        const tabs = [
            { label: 'First', content: 'The first tab' },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} tabHeaderProps={{ extraHeader: 'Click the headers' }} />);
        expect(screen.getByText('Click the headers')).toHaveClass(
            `${UI_PREFIX}__tabs__header__extra-header`
        );
    });
    test('tests TabBody props: applies rest props', async () => {
        const onClick = jest.fn();
        const tabs = [
            { label: 'First', content: 'The first tab', className: 'forwarded', onClick },
            { label: 'Second', content: 'The second tab' },
        ];
        render(<Tabs tabs={tabs} padded={true} />);
        expect(screen.getByText('First')).toHaveClass('forwarded');
        await userEvent.click(screen.getByText('First'));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(1);
    });
});
