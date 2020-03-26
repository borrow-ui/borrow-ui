import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar, SidebarContext, Icon } from '@borrow-ui/ui/lib';
import logo from 'static/borrow-ui-color-192.png';
import { ComponentsMenu } from './Menu';

export function Header() {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);
    const location = useLocation();
    const sidebarWidth = 46;

    const Logo =
        location.pathname !== '/' ? (
            <img src={logo} alt="Borrow UI logo" style={{ width: 25, height: 25 }} />
        ) : (
            undefined
        );
    const sidebarTriggerClass = `borrow-ui__navbar__group__item borrow-ui__sidebar-trigger p-0`;
    const sidebarTriggerStyle = {
        width: sidebarWidth,
        justifyContent: 'center',
        cursor: 'pointer',
    };
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
                { headerLabel: Logo, name: 'home' },
                { headerLabel: 'Components', bodyItem: ComponentsMenu, name: 'components' },
            ]}
            right={['Version 0.0.1']}
        />
    );
}
