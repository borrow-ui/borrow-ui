import { config, setConfig, getConfig } from './config';

describe('config', () => {
    test('default values', () => {
        // Initial getLocation should be undefined
        expect(config.getLocation()).toBeUndefined();
        expect(config.getLinkComponent()).toBe('a');
    });

    test('setConfig', () => {
        // Initial getLocation should be undefined
        expect(config.getLocation()).toBeUndefined();

        const original = config.getLocation;

        // set new getLocation
        const configSet = setConfig('getLocation', () => ({ path: '/' }));
        expect(configSet).toBe(true);
        expect(config.getLocation().path).toBe('/');

        // set a config that is not listed should return false
        // @ts-ignore
        const wrongConfigSet = setConfig('setWhatever', 1);
        expect(wrongConfigSet).toBe(false);

        // set back
        setConfig('getLocation', original);
    });

    test('getConfig', () => {
        // getConfig should return the config setting
        expect(getConfig('getLinkComponent')).toBe(config.getLinkComponent);
    });
});
