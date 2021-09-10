/**
 * Dashboard sidebar, created with SidebarBody and SidebarEntry
 * components.
 *
 * Instead of using a Sidebar component which has the trigger within it,
 * it uses the context defined in App.js and delegates the trigger to
 * the Header component.
 *
 * Ideally, the links here shuold be different from the Header, but the
 * purpose of this demo is to show components and their usage.
 */

import { Icon, SidebarBody, SidebarEntry } from '@borrow-ui/ui';

export function MainSidebar() {
    return (
        <SidebarBody
            hideTrigger={true}
            className="main-sidebar"
            stickyTop={46}
            height={'calc(100vh - 46px)'}
        >
            {/* sidebar has space-between, so we need to group items */}
            <div>
                <SidebarEntry iconName="home" to="/">
                    Home
                </SidebarEntry>
                <SidebarEntry iconName="my_library_books" to="/books">
                    Books
                </SidebarEntry>
                <SidebarEntry iconName="movie" to="/movies">
                    Movies
                </SidebarEntry>
            </div>
            <div className="flex-center-center p-b-10 p-t-10">
                <Icon name="help_outline" />
            </div>
        </SidebarBody>
    );
}
