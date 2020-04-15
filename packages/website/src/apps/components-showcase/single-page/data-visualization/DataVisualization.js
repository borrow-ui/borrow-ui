import React from 'react';

import { Title } from '@borrow-ui/ui';

import { Tables } from './Tables';

export function DataVisualization() {
    return (
        <div className="m-b-20">
            <Title anchor="data-visualization">Data Visualization</Title>

            <Title tag="h2" anchor="data-visualization-tables" className="m-b-0">
                Tables
            </Title>
            <Tables />
        </div>
    );
}
