import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const TABS_BODY_CLASS = `${UI_PREFIX}__tabs__body`;
const TABS_BODY_PADDED_CLASS = `${UI_PREFIX}__tabs__body--padded`;
const TABS_BODY_PADDED_TOP_CLASS = `${UI_PREFIX}__tabs__body--padded-top`;
const TABS_BODY_SELECTED_CLASS = `${UI_PREFIX}__tabs__body--selected`;
const TABS_BODY_CONTAINER_CLASS = `${UI_PREFIX}__tabs__body__container`;

export function TabBody({
    tabs,
    selectedTab,
    padded = true,
    paddedTop = false,
    className = '',
    ...rest
}) {
    const paddedClassName = padded ? TABS_BODY_PADDED_CLASS : '';
    const paddedTopClassName = paddedTop ? TABS_BODY_PADDED_TOP_CLASS : '';
    const contentCommonClassName = `${TABS_BODY_CLASS} ${paddedClassName} ${paddedTopClassName}`;
    const containerClass = `${TABS_BODY_CONTAINER_CLASS} ${className}`;
    return (
        <div className={containerClass} {...rest}>
            {tabs.map((tab, index) => {
                const selectedClassName = index + 1 === selectedTab ? TABS_BODY_SELECTED_CLASS : '';
                const contentClassName = `${contentCommonClassName} ${selectedClassName}`;

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
            content: propTypesChildren.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    /** Selected tab number (starts from 1) */
    selectedTab: PropTypes.number.isRequired,
    padded: PropTypes.bool,
    paddedTop: PropTypes.bool,
};
