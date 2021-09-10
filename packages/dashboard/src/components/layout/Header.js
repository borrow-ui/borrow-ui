/**
 * Dashboard main header uses Navbar component.
 * Ideally this shuold not have the same link of the sidebar,
 * but the purpose of this demo is to demonstrate the usage
 * of main components.
 *
 * The first component of the Navbar is the SidebarTrigger,
 * which controls the main sidebar.
 */

import { Link, Navbar, NavbarLink, SidebarTrigger } from '@borrow-ui/ui';

import packageJson from '../../../package.json';

export function Header() {
    return (
        <Navbar
            fixed={true}
            left={[
                <SidebarTrigger />,
                {
                    headerLabel: (
                        <NavbarLink tag={Link} to="/">
                            Home
                        </NavbarLink>
                    ),
                    name: 'home',
                },
                {
                    headerLabel: (
                        <NavbarLink tag={Link} to="/books">
                            Books
                        </NavbarLink>
                    ),
                    name: 'books',
                },
                {
                    headerLabel: (
                        <NavbarLink tag={Link} to="/movies">
                            Movies
                        </NavbarLink>
                    ),
                    name: 'movie',
                },
            ]}
            right={[<span className="m-r-10">{packageJson.version}</span>]}
        />
    );
}
