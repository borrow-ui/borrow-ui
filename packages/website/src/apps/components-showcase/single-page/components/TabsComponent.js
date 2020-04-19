import React from 'react';
import PropTypes from 'prop-types';

import { Block, Lorem, Tabs } from '@borrow-ui/ui/lib';

export function TabsComponent() {
    return (
        <Block>
            <Tabs
                tabs={[
                    { label: 'First', content: <Content l="First" /> },
                    { label: 'Default', content: <Content l="Default" /> },
                    { label: 'Third', content: <Content l="Third" /> },
                    { label: 'Fourth', content: <Content l="Fourth" /> },
                ]}
                firstOpen={2}
            />
        </Block>
    );
}

function Content({ l }) {
    return (
        <div>
            <h3>{l}</h3>
            <Lorem />
        </div>
    );
}

Content.propTypes = {
    l: PropTypes.string,
};
