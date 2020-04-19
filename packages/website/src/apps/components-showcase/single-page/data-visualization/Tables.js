import React from 'react';

import { Block, Button, Table } from '@borrow-ui/ui/lib';

const COLORS = ['primary', 'accent', 'neutral', 'positive', 'warning', 'negative'];

export function Tables() {
    return (
        <Block>
            <h3>Simple table with zebra rows</h3>
            <div>
                <Table {...getTable1Props()} />
            </div>
            <h3>Table with components and cell borders</h3>
            <div>
                <Table {...getTable2Props()} />
            </div>
        </Block>
    );
}

function getClassName(i) {
    const color = COLORS[i % COLORS.length];
    return `color-${color}`;
}

function getColumnsAndEntries() {
    const columns = [
        { title: 'ID', prop: 'id', width: 50 },
        { title: 'Name', prop: 'name' },
        { title: 'Description', prop: 'description' },
    ];
    const entries = [];
    for (let i = 1; i <= 23; i++)
        entries.push({
            id: i,
            name: 'Entry ' + i,
            description: 'A very long description for the row ' + i,
        });
    return {
        columns,
        entries,
    };
}

function getTable1Props() {
    return {
        ...getColumnsAndEntries(),
        pagination: {
            pageSize: 5,
        },
    };
}

function getTable2Props() {
    const { columns, entries } = getColumnsAndEntries();
    return {
        columns: [...columns, { title: '', prop: 'controls', width: 100 }],
        entries: entries.map((e, i) => {
            return {
                ...e,
                name: <div className={getClassName(i)}>{e.name}</div>,
                controls: (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button mean="primary" size="smaller" className="m-r-5">
                            Link
                        </Button>
                        <Button mean="negative" size="smaller">
                            Delete
                        </Button>
                    </div>
                ),
            };
        }),
        config: {
            zebra: false,
            borderType: 'cell',
        },
        pagination: {
            pageSize: 5,
        },
        elementsProps: {
            cellProps: {
                getProps: (col, entry) => {
                    if (entry && entry.id % 2 === 0)
                        return { style: { backgroundColor: '#ededed' }};
                },
            },
            cellContentProps: {
                getProps: (col, entry) => {
                    if (entry && entry.id % 2 === 0 && col.prop === 'description')
                        return { style: { justifyContent: 'flex-end' }};
                },
            },
        },
    };
}
