import React from 'react';

import { Title, Table } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TableDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="tables" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Tables
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Table } from '@borrow-ui/ui';"
                docs="?path=/docs/components-table--default-story"
            />
            <div style={{ fontSize: 14 }}>
                <Table
                    entries={[
                        { id: 1, name: 'Russia', population: 145.934, subregion: 'Eastern Europe' },
                        { id: 2, name: 'Germany', population: 83.783, subregion: 'Western Europe' },
                        { id: 3, name: 'UK', population: 67.886, subregion: 'Northern Europe' },
                        { id: 4, name: 'France', population: 65.273, subregion: 'Western Europe' },
                        { id: 5, name: 'Italy', population: 60.461, subregion: 'Southern Europe' },
                        { id: 6, name: 'Spain', population: 46.754, subregion: 'Southern Europe' },
                        { id: 7, name: 'Ukraine', population: 43.733, subregion: 'Eastern Europe' },
                        { id: 8, name: 'Poland', population: 37.846, subregion: 'Eastern Europe' },
                        { id: 9, name: 'Romania', population: 19.237, subregion: 'Eastern Europe' },
                    ]}
                    columns={[
                        { prop: 'id', title: 'ID', width: 50, align: 'right' },
                        { prop: 'name', title: 'Country', width: 140 },
                        { prop: 'population', title: 'Population (M)', width: 130, align: 'right' },
                        { prop: 'subregion', title: 'Subregion' },
                    ]}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
}
