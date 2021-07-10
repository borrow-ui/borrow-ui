import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { Icon } from '../icon/Icon';

const SIDEBAR_TRIGGER_CLASS = `${UI_PREFIX}__sidebar__trigger`;

export function SidebarTrigger({ sidebarContext, className = '', ...rest }) {
    const [sidebarState, setSidebarState] = useContext(sidebarContext);

    const onClick = () => {
        setSidebarState((state) => ({
            ...state,
            status: state.status === 'open' ? 'closed' : 'open',
        }));
    };

    const triggerClassName = `${SIDEBAR_TRIGGER_CLASS} ${className}`.trim();

    return (
        <div
            className={triggerClassName}
            {...a11yClickableElement({ onClick })}
            {...rest}
            data-testid="sidebar-trigger"
        >
            {sidebarState.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
        </div>
    );
}

export const SidebarTriggerPropTypes = {
    className: PropTypes.string,
};

SidebarTrigger.propTypes = {
    sidebarContext: PropTypes.object.isRequired,
    ...SidebarTriggerPropTypes,
};
