jest.mock('react-popper', () => {
    return {
        usePopper: () => {
            return {
                styles: {},
                attributes: {},
                update: () => {},
            };
        },
    };
});
