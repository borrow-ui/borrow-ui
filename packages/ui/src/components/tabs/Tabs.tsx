import React, { useState } from 'react';

import { UI_PREFIX } from '../../config';

import { TabHeader } from './TabHeader';
import { TabBody } from './TabBody';
import { TabsProps } from './Tabs.types';

export const FIRST_OPEN_LESS_EQUAL_TABS_NUMBER = `firstOpen should be less or equal to the total number of tabs`;

const TABS_CLASS = `${UI_PREFIX}__tabs`;

export const Tabs = ({
    tabs,
    firstOpen = 1,
    padded = true,
    paddedTop = false,
    className = '',
    tabHeaderProps = {},
    tabBodyProps = {},
    ...rest
}: TabsProps): JSX.Element => {
    if (firstOpen > tabs.length) {
        throw new Error(FIRST_OPEN_LESS_EQUAL_TABS_NUMBER);
    }

    const [selected, setSelected] = useState(firstOpen);

    const tabsClassName = `${TABS_CLASS} ${className}`;

    return (
        <div className={tabsClassName} {...rest}>
            <TabHeader
                tabs={tabs}
                selectedTab={selected}
                setSelectedTab={setSelected}
                {...tabHeaderProps}
            />
            <TabBody
                tabs={tabs}
                selectedTab={selected}
                padded={padded}
                paddedTop={paddedTop}
                {...tabBodyProps}
            />
        </div>
    );
};
