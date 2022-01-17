import { createContext } from 'react';

import { SidebarStateInterface, SidebarStateOverrideInterface } from './Sidebar.types';

export const SidebarContext = createContext<
    [
        SidebarStateInterface | null,
        React.Dispatch<React.SetStateAction<SidebarStateInterface>> | null
    ]
>([null, null]);

export const getSidebarContextDefaultState = (
    initialState?: SidebarStateOverrideInterface
): SidebarStateInterface => ({
    opened: false,
    openedEntrySubContent: {},
    autoCloseLink: false,
    ...initialState,
});
