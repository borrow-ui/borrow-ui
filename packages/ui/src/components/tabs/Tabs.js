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
    /** The list of tabs. Each list element is an object with `label` and `content` keys */
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: propTypesChildren.isRequired,
            content: propTypesChildren.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    /** Specifies which tab will be open by default (starts from 1) */
    firstOpen: PropTypes.number,
    /** Applies padding to all body's sides */
    padded: PropTypes.bool,
    /** Applies padding only on body's top */
    paddedTop: PropTypes.bool,
    /** Properties to forward to TabHeader */
    tabHeaderProps: PropTypes.object,
    /** Properties to forward to TabBody */
    tabBodyProps: PropTypes.object,
};
