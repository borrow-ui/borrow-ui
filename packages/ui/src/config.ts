import { FunctionComponent, ElementType } from 'react';

export const UI_PREFIX: string = 'borrow-ui';

export const SIZES = ['smaller', 'small', 'normal', 'big', 'bigger', 'huge'] as const;

type GenericFunctionType = () => any;
type FunctionReactTagType = () => FunctionComponent | ElementType;

interface IConfig {
    getLocation: GenericFunctionType;
    getLinkComponent: FunctionReactTagType;
    smallScreenMaxWidth: number;
}

export const config: IConfig = {
    getLocation: () => {},
    getLinkComponent: () => 'a',
    smallScreenMaxWidth: 599,
};

export type configSettingType = keyof IConfig;
export type configSettingValue = number | GenericFunctionType | FunctionReactTagType;

export const setConfig = <K extends configSettingType>(setting: K, value: IConfig[K]): boolean => {
    if (!config.hasOwnProperty(setting)) {
        console.error('Invalid setting:', setting);
        return false;
    }
    config[setting] = value;
    return true;
};

export const getConfig = (setting: configSettingType): configSettingValue => config[setting];
