import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar, SidebarContext, Icon } from '@borrow-ui/ui/lib';
import { ComponentsMenu } from './Menu';

export function Header() {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);
    const location = useLocation();
    const sidebarWidth = 46;

    const colors = location.pathname !== '/' ? 'color-primary-bg color-on-primary' : '';
    const sidebarTriggerClass = `borrow-ui__navbar__group__item borrow-ui__sidebar-trigger ${colors} p-0`;
    const sidebarTriggerStyle = { width: sidebarWidth, justifyContent: 'center' };
    const SidebarTrigger = (
        <span
            style={sidebarTriggerStyle}
            className={sidebarTriggerClass}
            onClick={() => {
                setSidebarState({
                    ...sidebarState,
                    status: sidebarState.status === 'open' ? 'closed' : 'open',
                });
            }}
        >
            {sidebarState.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
        </span>
    );

    return (
        <Navbar
            left={[
                SidebarTrigger,
                { headerLabel: 'Components', bodyItem: ComponentsMenu, name: 'components' },
            ]}
            right={['Version 0.0.1']}
        />
    );
}
