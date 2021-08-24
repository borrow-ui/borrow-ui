import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from './SearchBar';
import { UI_PREFIX } from '../../config';

describe('SearchBar', () => {
    test('renders a searchbar with content before and after', () => {
        render(
            <SearchBar
                data-testid="search-bar"
                inputProps={{ 'data-testid': 'input' }}
                beforeInput={<span>Before</span>}
                afterInput={<span>After</span>}
            />
        );

        const searchBar = screen.getByTestId('search-bar');
        const input = screen.getByTestId('input');

        expect(searchBar).toHaveClass(`${UI_PREFIX}__search-bar`);
        expect(input).toHaveClass(`${UI_PREFIX}__search-bar__input`);

        expect(screen.queryByText('Before')).toBeInTheDocument();
        expect(screen.queryByText('After')).toBeInTheDocument();
    });

    test('filters entries by text, and then get all the entries after clearing', async () => {
        const setFilteredEntries = jest.fn();
        const entries = [
            { id: 1, label: 'first' },
            { id: 2, label: 'second' },
            { id: 3, label: 'third' },
            { id: 4, label: 'another third' },
        ];
        render(
            <SearchBar
                debounceDelay={10}
                entries={entries}
                setFilteredEntries={setFilteredEntries}
            />
        );
        await userEvent.type(screen.getByRole('textbox'), 'first', { delay: 1 });
        await waitFor(() => expect(setFilteredEntries).toHaveBeenCalledWith([entries[0]]));

        await userEvent.clear(screen.getByRole('textbox'));
        await waitFor(() => expect(setFilteredEntries).toHaveBeenCalledWith(entries));
    });

    test('filters with an initial value', async () => {
        const setFilteredEntries = jest.fn();
        const entries = [
            { id: 1, label: 'first' },
            { id: 2, label: 'second' },
            { id: 3, label: 'third' },
            { id: 4, label: 'another third' },
        ];
        render(
            <SearchBar
                debounceDelay={10}
                initialSearch="second"
                entries={entries}
                setFilteredEntries={setFilteredEntries}
            />
        );
        await waitFor(() => expect(setFilteredEntries).toHaveBeenCalledWith([entries[1]]));
    });

    test('stores search outside', async () => {
        const setGlobalSearch = jest.fn();
        const { rerender } = render(
            <SearchBar debounceDelay={10} globalSearch={'test'} setGlobalSearch={setGlobalSearch} />
        );

        // initial call
        expect(setGlobalSearch).toHaveBeenCalledTimes(1);

        // do not call setGlobalSearch as the text is the same of globalSearch
        await userEvent.clear(screen.getByRole('textbox'));
        await userEvent.type(screen.getByRole('textbox'), 'test', { delay: 1 });
        expect(setGlobalSearch).toHaveBeenCalledTimes(1);
        // call setGlobalSearch as the text is different of globalSearch
        await userEvent.clear(screen.getByRole('textbox'));
        await userEvent.type(screen.getByRole('textbox'), 'trigger', { delay: 1 });
        await waitFor(() => expect(setGlobalSearch).toHaveBeenCalledWith('trigger'));

        rerender(
            <SearchBar
                debounceDelay={10}
                globalSearch={'again'}
                setGlobalSearch={setGlobalSearch}
            />
        );
        // Calls setGlobalSearch again
        await waitFor(() => expect(setGlobalSearch).toHaveBeenCalledWith('again'));
    });
});
