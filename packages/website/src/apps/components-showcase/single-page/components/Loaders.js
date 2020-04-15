import React from 'react';

import { Loader, Block } from '@borrow-ui/ui/lib';

export function Loaders() {
    return (
        <Block>
            <Block outstanding={true} contentCentered={true} style={{ height: 250 }}>
                <Loader />
            </Block>
            <div>
                Inline loader will appear like this: <Loader type="inline" /> You can put it between
                other text!
            </div>
        </Block>
    );
}
