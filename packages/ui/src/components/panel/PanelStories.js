import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../button/Button';

import { Panel } from './Panel';

export function PanelContentPropsOnOpen() {
    const [variableContent, setVariableContent] = useState(null);

    return (
        <Panel
            Trigger={({ setVisible }) => (
                <Button onClick={() => setVisible(true)}>Open Panel</Button>
            )}
            getPanelContentProps={() => ({
                title: 'onOpen hook demo',
                content: <ExampleComponent variableContent={variableContent} />,
                hooks: {
                    onOpen: ({ resolve }) => {
                        setTimeout(() => {
                            setVariableContent('Content set after 1500 ms.');
                            resolve();
                        }, 1500);
                    },
                },
            })}
        />
    );
}

function ExampleComponent({ variableContent }) {
    return (
        <div>
            <span>variableContent: {variableContent}</span>
        </div>
    );
}

ExampleComponent.propTypes = {
    variableContent: PropTypes.string,
};
