import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { TabBodyProps } from './Tabs.types';

const TABS_BODY_CLASS = `${UI_PREFIX}__tabs__body`;
const TABS_BODY_PADDED_CLASS = `${UI_PREFIX}__tabs__body--padded`;
const TABS_BODY_PADDED_TOP_CLASS = `${UI_PREFIX}__tabs__body--padded-top`;
const TABS_BODY_SELECTED_CLASS = `${UI_PREFIX}__tabs__body--selected`;
const TABS_BODY_CONTAINER_CLASS = `${UI_PREFIX}__tabs__body__container`;

export const TabBody = ({
    tabs,
    selectedTab,
    padded,
    paddedTop,
    className = '',
    ...rest
}: TabBodyProps): JSX.Element => {
    const contentCommonClassName = cx(TABS_BODY_CLASS, {
        [TABS_BODY_PADDED_CLASS]: padded,
        [TABS_BODY_PADDED_TOP_CLASS]: paddedTop,
    });
    const containerClassName = cx(TABS_BODY_CONTAINER_CLASS, className);
    return (
        <div className={containerClassName} {...rest}>
            {tabs.map(({ content, className: tabClassName = '', ...restTab }, index) => {
                const selectedClassName = index + 1 === selectedTab ? TABS_BODY_SELECTED_CLASS : '';
                const contentClassName =
                    `${contentCommonClassName} ${selectedClassName} ${tabClassName}`.trim();

                return (
                    <div key={`ui-tabs-body-${index}`} className={contentClassName} {...restTab}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
};
