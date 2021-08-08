import React, { useState } from 'react';

import { Title, SearchBar } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function SearchBarDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="searchbars" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Search Bars
                </Title>
            </a>
            <ImportStatement
                importStatement="import { SearchBar } from '@borrow-ui/ui';"
                docs="?path=/docs/components-searchbar--default-story"
            />
            <div>
                <SearchBarDyummy />
            </div>
        </div>
    );
}

function SearchBarDyummy() {
    const entries = [
        { id: 1, name: 'first entry', group: 'group 1' },
        { id: 2, name: 'second entry', group: 'group 2' },
        { id: 3, name: 'third entry', group: 'group 1' },
    ];
    const [filtered, setFiltered] = useState(entries);

    return (
        <div>
            <SearchBar
                entries={entries}
                setFilteredEntries={setFiltered}
                inputProps={{ placeholder: 'Type here to filter (with debounce)' }}
            />
            <p>Filtered entries:</p>
            {filtered.map((f) => {
                return (
                    <li key={f.id}>
                        {f.name} - {f.group}
                    </li>
                );
            })}
        </div>
    );
}
