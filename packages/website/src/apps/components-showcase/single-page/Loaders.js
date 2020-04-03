import React from 'react';

import { Loader, Block } from '@borrow-ui/ui/lib';

export function Loaders() {
    return (
        <div className="m-b-20">
            <h1>Loaders</h1>
            <Block outstanding={true} contentCentered={true} style={{ height: 250 }}>
                <Loader />
            </Block>
            <div>
                Inline loader will appear like this: <Loader type="inline" /> You can put it between
                other text!
            </div>
        </div>
    );
}
