export const UI_PREFIX = 'borrow-ui';

export const config = {
    getLocation: () => {},
    getLinkComponent: () => 'a',
};

export const setConfig = (setting, value) => {
    if (Object.keys(config).includes(setting)) {
        config[setting] = value;
        return true;
    }
    return false;
};

export const getConfig = setting => config[setting];
