import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Icon, Navbar, NavbarLink, SidebarTrigger } from '@borrow-ui/ui';

import logoColor from '../public/logo-color-192.png';
import packageJson from '../package.json';
import { sidebarContext } from './MainSidebar';

export function Header({ isSmallScreen }) {
    const logo = (
        <Image
            src={logoColor || '/logo-color-192.png'}
            alt="borrow-ui logo"
            width={25}
            height={25}
        />
    );

    return (
        <Navbar
            className="main-header"
            left={[
                {
                    headerLabel: (
                        <Link href="/">
                            <a className="borrow-ui__navbar__group borrow-ui__navbar__link">
                                <div className="flex-center-center">
                                    {logo}
                                    <span className="header__title">borrow-ui</span>
                                </div>
                            </a>
                        </Link>
                    ),
                },
                !isSmallScreen && {
                    headerLabel: (
                        <Link href="/tour">
                            <a className="borrow-ui__navbar__group borrow-ui__navbar__link">
                                <span>Tour</span>
                            </a>
                        </Link>
                    ),
                },
                !isSmallScreen && {
                    headerLabel: (
                        <Link href="/components">
                            <a className="borrow-ui__navbar__group borrow-ui__navbar__link">
                                <span>Components</span>
                            </a>
                        </Link>
                    ),
                },
            ].filter((v) => v)}
            right={[
                <NavbarLink
                    tag="a"
                    href="https://github.com/borrow-ui/borrow-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    key="github"
                >
                    <Icon family="fab" name="fa-github" size="small" />
                </NavbarLink>,
                !isSmallScreen && (
                    <span className="header__version" key="version">
                        v{packageJson.version}
                    </span>
                ),
                <div key="trigger" className="header__sidebar-trigger">
                    <SidebarTrigger sidebarContext={sidebarContext} />
                </div>,
            ].filter((v) => v)}
        />
    );
}
