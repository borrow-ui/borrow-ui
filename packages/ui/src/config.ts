export const UI_PREFIX: string = 'borrow-ui';

export const SIZES = ['smaller', 'small', 'normal', 'big', 'bigger', 'huge'] as const;

interface IConfig {
    getLocation: Function;
    getLinkComponent: Function;
    smallScreenMaxWidth: number;
}

export const config: IConfig = {
    getLocation: () => {},
    getLinkComponent: () => 'a',
    smallScreenMaxWidth: 599,
};

export type configSettingType = keyof IConfig;
export type configSettingValueInput = number & Function;
export type configSettingValue = number | Function;

export const setConfig = (setting: configSettingType, value: configSettingValueInput): boolean => {
    if (Object.keys(config).includes(setting)) {
        config[setting] = value;
        return true;
    }
    return false;
};

export const getConfig = (setting: configSettingType): configSettingValue => config[setting];
