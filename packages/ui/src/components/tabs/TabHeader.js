import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

const TABS_HEADER_CLASS = `${UI_PREFIX}__tabs__header`;
const TABS_HEADER_LABEL_CLASS = `${UI_PREFIX}__tabs__header__label`;
const TABS_HEADER_LABEL_SELECTED_CLASS = `${UI_PREFIX}__tabs__header__label--selected`;

export function TabHeader({ tabs, selectedTab, setSelectedTab, className = '', ...rest }) {
    const tabHeaderClassName = `${TABS_HEADER_CLASS} ${className}`;

    return (
        <div className={tabHeaderClassName} {...rest}>
            {tabs.map((tab, index) => {
                const classSelected =
                    index + 1 === selectedTab ? TABS_HEADER_LABEL_SELECTED_CLASS : '';
                return (
                    <div
                        key={`ui-tabs-header-label-${index}`}
                        className={`${TABS_HEADER_LABEL_CLASS} ${classSelected}`}
                        onClick={() => setSelectedTab(index + 1)}
                    >
                        {tab.label}
                    </div>
                );
            })}
        </div>
    );
}

TabHeader.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
};
