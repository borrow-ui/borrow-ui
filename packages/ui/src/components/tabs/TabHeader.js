import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { propTypesChildren } from '../../utils/types';

const TABS_HEADER_CLASS = `${UI_PREFIX}__tabs__header`;
const TABS_HEADER_LABEL_CLASS = `${UI_PREFIX}__tabs__header__label`;
const TABS_HEADER_LABEL_SELECTED_CLASS = `${UI_PREFIX}__tabs__header__label--selected`;
const TABS_HEADER_EXTRA_HEADER_CLASS = `${UI_PREFIX}__tabs__header__extra-header`;

export function TabHeader({
    tabs,
    selectedTab,
    setSelectedTab,
    className = '',
    extraHeader,
    ...rest
}) {
    const tabHeaderClassName = `${TABS_HEADER_CLASS} ${className}`;
    return (
        <div className={tabHeaderClassName} {...rest}>
            {tabs.map((tab, index) => {
                const classSelected =
                    index + 1 === selectedTab ? TABS_HEADER_LABEL_SELECTED_CLASS : '';
                const onClick = () => setSelectedTab(index + 1);
                return (
                    <div
                        key={`ui-tabs-header-label-${index}`}
                        className={`${TABS_HEADER_LABEL_CLASS} ${classSelected}`}
                        {...a11yClickableElement({ onClick })}
                    >
                        {tab.label}
                    </div>
                );
            })}
            {extraHeader && <div className={TABS_HEADER_EXTRA_HEADER_CLASS}>{extraHeader}</div>}
        </div>
    );
}

TabHeader.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: propTypesChildren.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    /** Selected tab number (starts from 1) */
    selectedTab: PropTypes.number.isRequired,
    /** Function called when tab is selected */
    setSelectedTab: PropTypes.func.isRequired,
    /** Element to be shown after all labels */
    extraHeader: propTypesChildren,
};
