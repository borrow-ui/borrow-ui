import { createContext } from 'react';

export const SidebarContext = createContext([null, null]);

SidebarContext.getDefaultState = (initialState) => ({
    opened: false,
    openedEntrySubContent: {},
    autoCloseLink: false,
    ...initialState,
});
