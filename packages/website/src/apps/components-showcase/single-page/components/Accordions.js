import React from 'react';

import { Block, Lorem, Accordion } from '@borrow-ui/ui/lib';

export function Accordions() {
    return (
        <Block>
            <Accordion title="Open accordion" initialStatus="open" className="m-b-20">
                <Block className="m-b-0">
                    <Lorem />
                </Block>
            </Accordion>
            <Accordion title="Closed accordion" initialStatus="closed">
                <Block className="m-b-0">
                    <Lorem />
                </Block>
            </Accordion>
        </Block>
    );
}
