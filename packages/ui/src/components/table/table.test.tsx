import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from './Table';
import { UI_PREFIX } from '../../config';

const entries = [
    { id: 1, name: 'Caio Mario' },
    { id: 2, name: 'Lucio Cornelio Silla' },
    { id: 3, name: 'Caio Giulio Cesare' },
    { id: 4, name: 'Marco Antonio' },
];

describe('Table', () => {
    test('renders a table', () => {
        const { container } = render(
            <Table
                entries={entries}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name' },
                ]}
                data-testid="table"
            />
        );

        const table = screen.getByTestId('table');

        expect(table).toHaveClass(`${UI_PREFIX}__table`);

        // has a pagination component
        expect(screen.getByText(/Showing items/)).toBeInTheDocument();

        // there are 2 odd cells
        expect(container.querySelectorAll(`.${UI_PREFIX}__table__body__row--odd`).length).toBe(2);

        // text is inside a cell content
        expect(screen.getByText(/Caio Giulio Cesare/)).toHaveClass(
            `${UI_PREFIX}__table__cell__content`
        );

        // headers are rendered inside thead
        expect(screen.getByText(/ID/).parentElement).toHaveClass(`${UI_PREFIX}__table__head__cell`);
        expect(screen.getByText(/ID/)?.parentElement?.parentElement?.parentElement).toHaveClass(
            `${UI_PREFIX}__table__head`
        );
    });

    test('renders a table with pagination', () => {
        render(
            <Table
                pagination={{ pageSize: 2 }}
                entries={entries}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name' },
                ]}
                data-testid="table"
            />
        );

        // has 2 pages
        expect(screen.getByText(/Showing items 1-2 out of 4/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();

        // First element is visible, third element is not visible
        expect(screen.queryByText('Caio Mario')).toBeInTheDocument();
        expect(screen.queryByText('Caio Giulio Cesare')).not.toBeInTheDocument();

        // Change page and elements shuold change visibility
        userEvent.click(screen.getByRole('button', { name: '2' }));
        expect(screen.queryByText('Caio Mario')).not.toBeInTheDocument();
        expect(screen.queryByText('Caio Giulio Cesare')).toBeInTheDocument();
    });

    test('renders a table without pagination', () => {
        render(
            <Table
                pagination={{ pageSize: 0 }}
                entries={entries}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name' },
                ]}
                data-testid="table"
            />
        );

        expect(screen.getByText(/Showing items 1-4 out of 4/)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument();
    });

    test('renders a table without status bar', () => {
        render(
            <Table
                statusBar={{ visible: false }}
                entries={entries}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name' },
                ]}
                data-testid="table"
            />
        );

        expect(screen.queryByText(/Showing items/)).not.toBeInTheDocument();
    });

    test('renders a status bar with "No entries" message', () => {
        render(
            <Table
                entries={[]}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name' },
                ]}
                data-testid="table"
            />
        );

        expect(screen.queryByText(/No entries/)).toBeInTheDocument();
    });

    test('aligns in different ways', () => {
        render(
            <Table
                entries={entries.map((e, i) => ({ ...e, counter: `counter ${i}` }))}
                columns={[
                    { prop: 'id', title: 'ID' },
                    { prop: 'name', title: 'Name', align: 'left', verticalAlign: 'top' },
                    { prop: 'counter', title: 'Counter' },
                ]}
                config={{ align: 'center', verticalAlign: 'center' }}
                elementsProps={{
                    cellProps: {
                        getProps: (column, entry) => {
                            return {
                                verticalAlign:
                                    entry && typeof entry[column.prop] === 'number' ? 'bottom' : '',
                            };
                        },
                    },
                    cellContentProps: {
                        getProps: (column, entry) => {
                            return { align: column.prop === 'id' ? 'right' : '' };
                        },
                    },
                }}
            />
        );

        // align and valign in config are properly set
        expect(screen.getByText(/counter 1/)).toHaveClass(
            `${UI_PREFIX}__table__cell__content--align-center`
        );
        expect(screen.getByText(/counter 1/).parentElement).toHaveClass(
            `${UI_PREFIX}__table__cell--vertical-align-center`
        );
        // align and valign in column definition are properly set
        expect(screen.getByText(/Caio Giulio Cesare/)).toHaveClass(
            `${UI_PREFIX}__table__cell__content--align-left`
        );
        expect(screen.getByText(/Caio Giulio Cesare/).parentElement).toHaveClass(
            `${UI_PREFIX}__table__cell--vertical-align-top`
        );
    });
});
