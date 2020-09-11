import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { TabHeader } from './TabHeader';
import { TabBody } from './TabBody';

const TABS_CLASS = `${UI_PREFIX}__tabs`;

export function Tabs({
    tabs,
    firstOpen = 1,
    padded = true,
    paddedTop = false,
    className = '',
    tabHeaderProps = {},
    tabBodyProps = {},
    ...rest
}) {
    if (firstOpen > tabs.length) {
        throw new Error(
            `firstOpen (${firstOpen}) should be less or equal to the total number of tabs (${tabs.length})`
        );
    }

    const [selected, setSelected] = useState(firstOpen);

    const tabsClassName = `${TABS_CLASS} ${className}`;

    return (
        <div className={tabsClassName} {...rest}>
            <TabHeader
                tabs={tabs}
                selectedTab={selected}
                setSelectedTab={setSelected}
                {...tabBodyProps}
            />
            <TabBody
                tabs={tabs}
                selectedTab={selected}
                padded={padded}
                paddedTop={paddedTop}
                {...tabHeaderProps}
            />
        </div>
    );
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: propTypesChildren.isRequired,
            content: propTypesChildren.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    firstOpen: PropTypes.number,
    padded: PropTypes.bool,
    paddedTop: PropTypes.bool,
    tabHeaderProps: PropTypes.object,
    tabBodyProps: PropTypes.object,
};
