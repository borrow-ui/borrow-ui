import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

const TABS_BODY_CLASS = `${UI_PREFIX}__tabs__body`;
const TABS_BODY_COMPACT_CLASS = `${UI_PREFIX}__tabs__body--compact`;
const TABS_BODY_SELECTED_CLASS = `${UI_PREFIX}__tabs__body--selected`;
const TABS_BODY_CONTAINER_CLASS = `${UI_PREFIX}__tabs__body__container`;

export function TabBody({ tabs, selectedTab, compact, className = '', ...rest }) {
    const compactClassName = compact ? TABS_BODY_COMPACT_CLASS : '';

    const containerClass = `${TABS_BODY_CONTAINER_CLASS} ${className}`;
    return (
        <div className={containerClass} {...rest}>
            {tabs.map((tab, index) => {
                const selectedClassName = index + 1 === selectedTab ? TABS_BODY_SELECTED_CLASS : '';
                const contentClassName = `${TABS_BODY_CLASS} ${selectedClassName} ${compactClassName}`;

                return (
                    <div key={`ui-tabs-body-${index}`} className={contentClassName}>
                        {tab.content}
                    </div>
                );
            })}
        </div>
    );
}

TabBody.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    selectedTab: PropTypes.number.isRequired,
    compact: PropTypes.bool,
};
