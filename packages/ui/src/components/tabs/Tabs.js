import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

import { TabHeader } from './TabHeader';
import { TabBody } from './TabBody';

const TABS_CLASS = `${UI_PREFIX}__tabs`;

export function Tabs({
    tabs,
    firstOpen = 1,
    compact = false,
    className = '',
    headerProps = {},
    bodyProps = {},
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
                {...bodyProps}
            />
            <TabBody tabs={tabs} selectedTab={selected} compact={compact} {...headerProps} />
        </div>
    );
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    firstOpen: PropTypes.number,
    compact: PropTypes.bool,
    headerProps: PropTypes.object,
    bodyProps: PropTypes.object,
};
