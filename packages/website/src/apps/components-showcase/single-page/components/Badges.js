import React from 'react';

import { Block, Badge } from '@borrow-ui/ui/lib';

export function Badges() {
    return (
        <Block>
            <div className="singlepage__badges">
                <Badge>Badge</Badge>
                <Badge color="primary">Badge</Badge>
                <Badge color="accent" type="squared">
                    Squared
                </Badge>
                <Badge color="positive" type="circular">
                    10
                </Badge>
                <Badge color="negative" onClick={() => window.alert('Error clicked')}>
                    Error (click)
                </Badge>
            </div>
        </Block>
    );
}
