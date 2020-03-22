import React from 'react';

import { Navbar } from '@borrow-ui/ui/lib';
import { ComponentsMenu } from './Menu';

export function Header() {
    return (
        <Navbar
            left={[
                'Home',
                { headerLabel: 'Components', bodyItem: ComponentsMenu, name: 'components' },
            ]}
            right={['User']}
        />
    );
}
